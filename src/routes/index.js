const express = require("express");

const authRoutes = require("./auth");
const usersRoutes = require("./users");
const companyRoutes = require("./company");
const isAuth = require("../api/middleware/is-auth");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", isAuth, usersRoutes);
router.use("/companies", isAuth, companyRoutes);

module.exports = router;
