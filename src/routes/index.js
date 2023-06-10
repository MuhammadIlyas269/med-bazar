const express = require("express");

const authRoutes = require("./auth");
const usersRoutes = require("./users");
const companyRoutes = require("./company");
const productRoutes = require("./product");

const isAuth = require("../api/middleware/is-auth");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", isAuth, usersRoutes);
router.use("/companies", isAuth, companyRoutes);
router.use("/products", isAuth, productRoutes);

module.exports = router;
