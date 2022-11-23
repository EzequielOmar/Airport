"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Employees",
      [
        {
          firstName: "Lionel",
          lastName: "Scaloni",
          sector: 1,
          position: 1,
          createdAt: "2022-03-10",
          updatedAt: "2022-03-10",
        },
        {
          firstName: "Sepp",
          lastName: "Blatter",
          sector: 1,
          position: 1,
          createdAt: "2022-05-10",
          updatedAt: "2022-05-10",
        },
        {
          firstName: "Adenor Leonardo",
          lastName: "Bacchi Tite",
          sector: 1,
          position: 2,
          createdAt: "2022-04-10",
          updatedAt: "2022-04-10",
        },
        {
          firstName: "Pep",
          lastName: "Guardiola",
          sector: 1,
          position: 2,
          createdAt: "2022-11-17",
          updatedAt: "2022-11-17",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Employees", null, {});
  },
};
