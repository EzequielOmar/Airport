const Flight = require("../../models/index.js").Flights;
const Terminal = require("../../models/index.js").Terminals;
const Employee = require("../../models/index.js").Employees;
const { terminal_exists } = require("./terminal-controller");
const { employee_exists } = require("./employee-controller");
const { Op } = require("sequelize");

const get_flights = async (req, res, next) => {
  return Flight.findAll({
    include: [
      { model: Terminal, as: "arrivals", required: true },
      { model: Terminal, as: "departures", required: true },
      { model: Employee, required: true },
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

const search_route = async (req, res, next) => {
  try {
    let where = {};
    if (req.body.fromDate || req.body.toDate) {
      where["departure"] = {};
      if (req.body.fromDate)
        where["departure"][Op.gte] = new Date(req.body.fromDate);
      if (req.body.toDate)
        where["departure"][Op.lte] = new Date(req.body.toDate);
    }
    const flights = await Flight.findAll({
      where,
    });
    const routes = getRoutes(
      flights,
      parseInt(req.body.fromTerminal),
      parseInt(req.body.toTerminal)
    );
    if (!Object.keys(routes).length)
      throw {
        error: "Sorry, there is no route to fulfill your request",
        code: 400,
      };
    res.status(200).send({
      data: routes,
      code: 200,
    });
  } catch (err) {
    next(err);
  }
};

const getRoutes = (flights, from, to) => {
  const graph = toGraph(flights);
  const queue = [];
  const visited = new Set();
  const routesControl = {};
  const completeRoutes = {};
  const MAX_LAYOVERS = 5;
  const MIN_LAYOVER_TIME = 3;

  visited.add(from);
  queue.push(from);
  routesControl[from] = {
    layovers: 0,
    total_cost: 0,
    flight_time: 0,
    layover_time: 0,
    route: [],
  };

  while (queue.length > 0) {
    const currentCity = queue.shift();
    const adjacentCities = graph[currentCity] || [];
    if (currentCity === to) completeRoutes[to] = routesControl[to];
    for (nextCity of adjacentCities) {
      if (!visited.has(nextCity.dest)) {
        let { flightHours, flightCost, layoverHours } = getFlightData(
          routesControl,
          currentCity,
          nextCity
        );
        //* Break route if there is short time between flights, or too many layovers.
        if (
          (layoverHours && layoverHours < MIN_LAYOVER_TIME) ||
          routesControl[currentCity].layovers > MAX_LAYOVERS
        )
          break;
        routesControl[nextCity.dest] = {
          layovers: routesControl[currentCity].layovers + 1,
          total_cost: routesControl[currentCity].total_cost + flightCost,
          flight_time: routesControl[currentCity].flight_time + flightHours,
          layover_time: routesControl[currentCity].layover_time + layoverHours,
          route: [...routesControl[currentCity].route, nextCity.flight],
        };
        queue.push(nextCity.dest);
        visited.add(nextCity.dest);
      }
    }
  }
  return completeRoutes;
};

const getFlightData = (routesControl, currentCity, nextCity) => {
  let flightHours,
    flightCost,
    layoverHours = null;
  flightHours =
    (nextCity.flight.arrival.getTime() - nextCity.flight.departure.getTime()) /
    (1000 * 60 * 60);
  flightCost = parseFloat(nextCity.flight.cost);
  if (routesControl[currentCity].layovers) {
    const lastFlight =
      routesControl[currentCity].route[
        routesControl[currentCity].route.length - 1
      ];
    layoverHours =
      (nextCity.flight.departure.getTime() - lastFlight.arrival.getTime()) /
      (1000 * 60 * 60);
  }
  return { flightHours, flightCost, layoverHours };
};

const toGraph = (flights) => {
  const graph = {};
  for (let i = 0; i < flights.length; i++) {
    const src = flights[i].dataValues.from;
    const dest = flights[i].dataValues.to;
    if (graph[src] != undefined)
      graph[src].push({ dest: dest, flight: flights[i].dataValues });
    else graph[src] = [{ dest: dest, flight: flights[i].dataValues }];
  }
  return graph;
};

module.exports = {
  get_flights,
  new_flight,
  search_route,
};
