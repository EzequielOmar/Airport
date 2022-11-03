const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");

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

//MIDDLEWARES
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES
app.get("/", (req, res) => {
  res.send("app working");
});

// Assign the port number and run server
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
