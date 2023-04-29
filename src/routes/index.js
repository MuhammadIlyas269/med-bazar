const express = require("express");

const authRoutes = require("./auth");
const salesmanRoutes = require("./salesman");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/salesman", salesmanRoutes);

module.exports = router;
