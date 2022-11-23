"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Passengers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /*
      models.Passengers.hasMany(models.Payment_Methods, {
        as: "payment_methods",
      });
      models.Passengers.hasMany(models.Tickets, {
        as: "tickets",
      });
      */
      models.Passengers.belongsToMany(models.Flights, {
        through: models.Flight_Passenger,
        foreignKey: "passangerId",
        as: "flights",
      });
    }
  }
  Passengers.init(
    {
      firstName: {
        type: DataTypes.STRING(100),
        validate: { is: /^[a-zA-Z ]+$/i, len: [2, 100] },
      },
      lastName: {
        type: DataTypes.STRING(100),
        validate: { is: /^[a-zA-Z ]+$/i, len: [2, 100] },
      },
      passportId: {
        type: DataTypes.STRING(100),
        validate: { is: /^[0-9]+$/i, len: [2, 100] },
      },
      phone: {
        type: DataTypes.STRING(100),
        validate: { is: /^[0-9+ ]+$/i, len: [2, 100] },
      },
    },
    {
      sequelize,
      modelName: "Passengers",
      omitNull: false,
    }
  );
  return Passengers;
};
