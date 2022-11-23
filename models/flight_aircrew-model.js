"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight_Aircrew extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Flight_Aircrew.belongsTo(models.Flights, {
        foreignKey: "flightId",
        targetKey: "id",
      });
      models.Flight_Aircrew.belongsTo(models.Employees, {
        foreignKey: "employeeId",
        targetKey: "id",
      });
    }
  }
  Flight_Aircrew.init(
    {},
    {
      sequelize,
      modelName: "Flight_Aircrew",
      omitNull: false,
      timestamps: false,
    }
  );
  return Flight_Aircrew;
};
