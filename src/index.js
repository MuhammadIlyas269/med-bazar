require("dotenv").config();
require("./database/connection");
require("./database/models");

const express = require("express");
const cors = require("cors");
const allRoutes = require("./routes");

const StartServer = async () => {
  const app = express();
  const PORT = process.env.PORT;

  app.use(express.json());
  app.use(cors());
  app.use("/", allRoutes);

  app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
  });
};

StartServer();
