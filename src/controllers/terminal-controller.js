const Terminal = require("../../models/index.js").Terminals;

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
  terminal_exists,
};
