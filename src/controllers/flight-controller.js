const { validationResult } = require("express-validator");
const Flight = require("../../models/index.js").Flights;
const { terminal_exists } = require("./terminal-controller");
const { employee_exists } = require("./employee-controller");

const get_flights = async (req, res, next) => {
  return Flight.findAll()
    .then((data) =>
      res.status(200).send({
        data: data,
        code: 200,
      })
    )
    .catch((err) => next(err));
};

const new_flight = async (req, res, next) => {
  try {
    await terminal_exists(req.body.from);
    await terminal_exists(req.body.to);
    //* Manually insert pilot in aircrew, and check existance of aircrew (it can be more complex)
    let aircrew = JSON.parse(req.body.aircrew);
    aircrew.push(parseInt(req.body.pilot));
    for (let i = 0; i < aircrew.length; i++) await employee_exists(aircrew[i]);
    //* Create flight, save and return response
    const flight_data = {
      departure: req.body.departure,
      arrival: req.body.arrival,
      capacity: req.body.capacity,
      cost: req.body.cost,
      from: req.body.from,
      to: req.body.to,
      pilot: req.body.pilot,
    };
    const flight = await Flight.create(flight_data);
    //* Add M:M relationship with employees through aircrew
    await flight.addAircrew(JSON.parse(req.body.aircrew));
    return res.status(201).send({
      message: "Flight created",
      data: flight.dataValues,
      code: 201,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get_flights,
  new_flight,
};
