module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ra: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: { include: ["name", "email", "ra", "cpf"] },
      },
    }
  );
  return Student;
};
