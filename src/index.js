require("./utils/database");
require("./models");

const express = require("express");
const homeRoutes = require("./routes/home");

const app = express();

app.use("/", homeRoutes);

app.listen(8000);
