const express = require("express");

const authRoutes = require("./auth");
const usersRoutes = require("./users");
const companyRoutes = require("./company");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/companies", companyRoutes);

module.exports = router;
