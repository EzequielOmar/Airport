"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Flights.belongsToMany(models.Employees, {
        through: models.Flight_Aircrew,
        foreignKey: "flightId",
        as: "aircrew",
      });
      models.Flights.belongsToMany(models.Passengers, {
        through: models.Flight_Passenger,
        foreignKey: "flightId",
        as: "passengers",
      });
    }
  }
  Flights.init(
    {
      departure: { type: DataTypes.DATE, isAfter: DataTypes.NOW },
      arrival: { type: DataTypes.DATE, isAfter: DataTypes.NOW },
      capacity: { type: DataTypes.INTEGER, isInt: true, min: 1 },
      cost: { type: DataTypes.DECIMAL, isDecimal: true, min: 1 },
      from: { type: DataTypes.INTEGER, isInt: true, min: 1 },
      to: { type: DataTypes.INTEGER, isInt: true, min: 1 },
      pilot: { type: DataTypes.INTEGER, isInt: true, min: 1 },
    },
    {
      sequelize,
      modelName: "Flights",
      omitNull: false,
    }
  );
  return Flights;
};
