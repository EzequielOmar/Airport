"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Flights", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      departure: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      arrival: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cost: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      from: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Terminals",
          key: "id",
        },
      },
      to: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Terminals",
          key: "id",
        },
      },
      pilot: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Employees",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Flights");
  },
};
