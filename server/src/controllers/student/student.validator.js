const Joi = require("joi");

export const getAllStudents = {
  query: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
};

export const getStudent = {
  params: {
    ra: Joi.number().required(),
  },
};

export const deleteStudent = {
  params: {
    ra: Joi.number().required(),
  },
};

export const create = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    ra: Joi.string().required(),
    cpf: Joi.string().required().length(14),
  },
};

export const update = {
  params: {
    ra: Joi.number().required(),
  },
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: Joi.string().required().length(14),
  },
};
