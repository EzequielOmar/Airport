const Terminal = require("../../models/index.js").Terminals;
const Flight = require("../../models/index.js").Flights;

const get_terminals = async (req, res, next) => {
  return Terminal.findAll({
    include: [
      { model: Flight, as: "arrivals" },
      { model: Flight, as: "departures" },
    ],
  })
    .then((data) =>
      res.status(200).send({
        data: data,
        code: 200,
      })
    )
    .catch((err) => next(err));
};

/**
 * Check by id if terminal exists in database
 * Throw exception if not found
 * @param {*} id
 * @returns Promise
 */
const terminal_exists = (id) =>
  Terminal.findByPk(id)
    .then((t) => {
      if (!t) throw { error: `Terminal with id:${id} not found`, code: 400 };
    })
    .catch((e) => {
      throw e;
    });

module.exports = {
  get_terminals,
  terminal_exists,
};
