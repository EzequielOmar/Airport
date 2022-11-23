"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight_Passenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Flight_Passenger.belongsTo(models.Flights, {
        foreignKey: "flightId",
        targetKey: "id",
      });
      models.Flight_Passenger.belongsTo(models.Passengers, {
        foreignKey: "passengerId",
        targetKey: "id",
      });
    }
  }
  Flight_Passenger.init(
    {},
    {
      sequelize,
      modelName: "Flight_Passenger",
      omitNull: false,
      timestamps: false,
    }
  );
  return Flight_Passenger;
};
