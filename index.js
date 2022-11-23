const express = require("express");
const { Sequelize } = require("sequelize");
const bodyParser = require("body-parser");

//* Import app routes
const flightRoutes = require(__dirname + "/src/routes/flights-routes.js");

const PORT = process.env.PORT || 9000;
const app = express();

//* Get db variales according environment
const config = require(__dirname + "/config/config.json")[process.env.NODE_ENV];

//* Connect to db
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { host: config.host, dialect: config.dialect }
);

//* Throw error if db connection fails
sequelize.authenticate().catch((e) => {
  console.log("Error while trying to connect to database: " + e);
});

//* MIDDLEWARES
//* Parse application/json
app.use(bodyParser.json());
//* Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//* ROUTES
app.use("/api/flights", flightRoutes);

//* Error handler
app.use((err, req, res, next) => {
  console.log("\x1b[31m", "*******************************************");
  console.log("\x1b[31m", "ERROR HANDLER:");
  console.log("\x1b[31m", err.message);
  console.log(err);
  console.log("\x1b[31m", err.error);
  console.log("\x1b[31m", err.code);
  console.log("\x1b[31m", "*******************************************");
  //TODO curate errors and return error information
  res.send("some error");
});

//* Assign the port number and run server
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
