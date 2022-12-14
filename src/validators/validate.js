const { validationResult, ValidationChain } = require("express-validator");

// parallel processing
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    else return next(errors);
  };
};

module.exports = validate;
