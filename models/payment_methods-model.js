"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment_Methods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment_Methods.init(
    {
      method: { type: DataTypes.INTEGER, isInt: true, min: 1, max: 100 },
      card_number: {
        type: DataTypes.STRING(100),
        isCreditCard: true,
        len: [2, 100],
      },
      cbu: {
        type: DataTypes.STRING(100),
        validate: { is: /^[0-9]+$/i, len: [2, 100] },
      },
      bankProvider: {
        type: DataTypes.INTEGER,
        isInt: true,
        min: 1,
        max: 100,
      },
    },
    {
      sequelize,
      modelName: "Payment_Methods",
      omitNull: false,
    }
  );
  return Payment_Methods;
};
