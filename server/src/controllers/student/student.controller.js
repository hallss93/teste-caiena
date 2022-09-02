import { Student } from "../../models";
import { Op } from "sequelize";
import { successResponse, errorResponse } from "../../helpers";

export const allStudents = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const query = req.query.query || "";
    const sortBy = req.query.sortBy || "name";
    const sortDesc = req.query.sortDesc || true;
    const limit = Number(req.query.limit) || 10;
    let where = {};
    if (query.trim() != "") {
      where = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            ra: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            cpf: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      };
    }
    const students = await Student.findAndCountAll({
      order: [[sortBy, sortDesc ? "DESC" : "ASC"]],
      offset: (page - 1) * limit,
      limit,
      where,
    });
    return successResponse(req, res, { students });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getOneStudent = async (req, res) => {
  try {
    const { ra } = req.params;
    const student = await Student.findOne({ where: { ra } });
    if (!student) {
      throw new Error("Student not exists with this RA");
    }

    return successResponse(req, res, student);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const create = async (req, res) => {
  try {
    const { name, email, ra, cpf } = req.body;

    const student = await Student.findOne({
      where: { ra },
    });
    if (student) {
      throw new Error("Student already exists with same RA");
    }
    const payload = {
      name,
      email,
      ra,
      cpf,
    };

    const newStudent = await Student.create(payload);
    return successResponse(req, res, { student: newStudent });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const update = async (req, res) => {
  try {
    const { name, email, cpf } = req.body;
    const { ra } = req.params;
    const student = await Student.findOne({ where: { ra } });
    if (!student) {
      throw new Error("Student not exists with this RA");
    }

    const payload = {
      name,
      email,
      ra,
      cpf,
    };

    student.update(payload, { where: { ra } });
    return successResponse(req, res, student);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const { ra } = req.params;
    const student = await Student.findOne({ where: { ra } });
    if (!student) {
      throw new Error("Student not exists with this RA");
    }

    student.destroy();
    return successResponse(req, res, student);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
