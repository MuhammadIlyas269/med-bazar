const express = require("express");

const authRoutes = require("./auth-routes");
const usersRoutes = require("./users-routes");
const companyRoutes = require("./company-routes");
const productRoutes = require("./product-routes");

const isAuth = require("../api/middleware/is-auth");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", isAuth, usersRoutes);
router.use("/companies", isAuth, companyRoutes);
router.use("/products", isAuth, productRoutes);

module.exports = router;
