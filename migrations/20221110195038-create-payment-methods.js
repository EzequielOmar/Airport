'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payment_Methods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      method: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      card_number: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      cbu: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      bankProvider: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      owner: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Passengers",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payment_Methods');
  }
};