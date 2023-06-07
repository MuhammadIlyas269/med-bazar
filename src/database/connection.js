const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbUsername = process.env.DB_USERNAME;
const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;
const host = process.env.DB_HOST || "localhost";
const dbPort = 3306;

const dbURI = `mysql://${dbUsername}:${dbPassword}@${host}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(dbURI);

sequelize
  .authenticate()
  .then(() => {
    console.log("User DB Connected");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log("DB Sync");
  })
  .catch((err) => {
    console.log(err.message);
    console.log("Error In DB Sync");
  });
module.exports = sequelize;
