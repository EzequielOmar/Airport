const new_flight_validationSchema = {
  departure: {
    notEmpty: true,
    custom: {
      options: (value) => {
        if (new Date(value).toString() !== "Invalid Date") return true;
      },
    },
    errorMessage: "Field departure is invalid",
  },
  arrival: {
    notEmpty: true,
    custom: {
      options: (value) => {
        if (new Date(value).toString() !== "Invalid Date") return true;
      },
    },
    errorMessage: "Field arrival is invalid",
  },
  capacity: {
    notEmpty: true,
    isInt: { min: 1 },
    errorMessage: "Field capacity is invalid",
  },
  cost: {
    notEmpty: true,
    isFloat: { min: 1 },
    errorMessage: "Field cost is invalid",
  },
  from: {
    notEmpty: true,
    isInt: { min: 1 },
    errorMessage: "Field from is invalid",
  },
  to: {
    notEmpty: true,
    isInt: { min: 1 },
    errorMessage: "Field to is invalid",
  },
  pilot: {
    notEmpty: true,
    isInt: { min: 1 },
    errorMessage: "Field pilot is invalid",
  },
  //* Checks for optional array of positive integers
  aircrew: {
    optional: {
      custom: {
        options: (value) => {
          arr = JSON.parse(value);
          if (
            Array.isArray(arr) &&
            arr.filter((i) => i > 0).length === arr.length
          )
            return true;
        },
      },
    },
    errorMessage: "Field aircrew is invalid",
  },
};

module.exports = new_flight_validationSchema;
