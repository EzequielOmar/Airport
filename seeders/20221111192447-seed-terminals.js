"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Terminals",
      [
        {
          codigo_IATA: "EZE",
          name: "Aeropuerto Internacional Ministro Pistarini",
          city: "Buenos Aires",
          capacity: 14547,
        },
        {
          codigo_IATA: "PAR",
          name: "Metropolitan Area",
          city: "Paris",
          capacity: 100547,
        },
        {
          codigo_IATA: "LAX",
          name: "Los Angeles International Airport",
          city: "Los Angeles, California",
          capacity: 150547,
        },
        {
          codigo_IATA: "DEL",
          name: "Indira Gandhi International Airport",
          city: "Delhi",
          capacity: 15547,
        },
        {
          codigo_IATA: "MAD",
          name: "Adolfo Suárez Madrid–Barajas Airport",
          city: "Madrid",
          capacity: 108047,
        },
        {
          codigo_IATA: "PEK",
          name: "Beijing Daxing International Airport",
          city: "Beijing",
          capacity: 508047,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Terminals", null, {});
  },
};
