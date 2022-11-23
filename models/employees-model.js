"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Employees.belongsToMany(models.Flights, {
        through: models.Flight_Aircrew,
        foreignKey: "employeeId",
        as: "assigned_flights",
      });
    }
  }
  Employees.init(
    {
      firstName: {
        type: DataTypes.STRING(100),
        validate: { is: /^[a-zA-Z ]+$/i, len: [2, 100] },
      },
      lastName: {
        type: DataTypes.STRING(100),
        validate: { is: /^[a-zA-Z ]+$/i, len: [2, 100] },
      },
      sector: { type: DataTypes.INTEGER, isInt: true, min: 1, max: 100 },
      position: { type: DataTypes.INTEGER, isInt: true, min: 1, max: 100 },
    },
    {
      sequelize,
      modelName: "Employees",
      omitNull: false,
    }
  );
  return Employees;
};
