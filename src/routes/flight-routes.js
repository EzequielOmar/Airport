var express = require("express");
var router = express.Router();
const flightsController = require("../controllers/flight-controller");
const validate = require("../validators/validate");
const { checkSchema } = require("express-validator");
const {
  new_flight_validationSchema,
  search_route_validationSchema,
} = require("../validators/flight-validator");

router.get("/", flightsController.get_flights);

router.post(
  "/",
  validate(checkSchema(new_flight_validationSchema)),
  flightsController.new_flight
);

router.post(
  "/search",
  validate(checkSchema(search_route_validationSchema)),
  flightsController.search_route
);

module.exports = router;
