"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Passengers",
      [
        {
          firstName: "Tito",
          lastName: "Lewandowski",
          passportId: "9999999",
          phone: "+54999999999",
          createdAt: "2022-03-11",
          updatedAt: "2022-03-11",
        },
        {
          firstName: "Lionel Andrés",
          lastName: "Messi",
          passportId: "10101010",
          phone: "+54 911 1345 1010",
          createdAt: "2022-11-11",
          updatedAt: "2022-11-11",
        },
        {
          firstName: "Killian",
          lastName: "Mbappe",
          passportId: "123456",
          phone: "+54 999 999999",
          createdAt: "2022-05-11",
          updatedAt: "2022-05-11",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Passengers", null, {});
  },
};
