"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Terminals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Terminals.belongsToMany(models.Flights, {
        through: models.Flight_Aircrew,
        foreignKey: "flightId",
        as: "assigned_flights",
      });
    }
  }
  Terminals.init(
    {
      codigo_IATA: {
        type: DataTypes.STRING(100),
        validate: { is: /^[A-Z]+$/i, len: [3] },
      },
      name: {
        type: DataTypes.STRING(100),
        validate: { is: /^[a-zA-Z0-9-_'`',;. ]+$/i, len: [2, 100] },
      },
      city: {
        type: DataTypes.STRING(100),
        validate: { is: /^[a-zA-Z0-9-_'`',;. ]+$/i, len: [2, 100] },
      },
      capacity: { type: DataTypes.INTEGER, isInt: true, min: 1 },
    },
    {
      sequelize,
      modelName: "Terminals",
      timestamps: false,
      omitNull: false,
    }
  );
  return Terminals;
};
