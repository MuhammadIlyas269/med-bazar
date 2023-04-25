const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((err) => {
    console.log("Unable to connect to the DB", err);
  });

sequelize
  .sync()
  .then((result) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
