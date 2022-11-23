const Employee = require("../../models/index.js").Employees;

/**
 * Check by id if employee exists in database
 * Throw exception if not found
 * @param {*} id
 * @returns Promise
 */
employee_exists = (id) =>
  Employee.findByPk(id)
    .then((p) => {
      if (!p) throw { error: `Employee with id:${id} not found`, code: 400 };
    })
    .catch((e) => {
      throw e;
    });

module.exports = {
  employee_exists
};
