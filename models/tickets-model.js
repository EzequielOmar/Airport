"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tickets.init(
    {
      total_cost: { type: DataTypes.DECIMAL, isDecimal: true, min: 1 },
      taxes: { type: DataTypes.DECIMAL, isDecimal: true, min: 1 },
      seat: {
        type: DataTypes.INTEGER,
        isInt: true,
        min: 1,
      },
      category: {
        type: DataTypes.INTEGER,
        isInt: true,
        min: 1,
        max: 100,
      },
      status: {
        type: DataTypes.INTEGER,
        isInt: true,
        min: 1,
        max: 100,
      },
    },
    {
      sequelize,
      modelName: "Tickets",
      omitNull: false,
    }
  );
  return Tickets;
};
