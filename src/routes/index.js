const express = require("express");

const authRoutes = require("./auth-routes");
const usersRoutes = require("./users-routes");
const companyRoutes = require("./company-routes");
const productRoutes = require("./product-routes");
const purchaseRoutes = require("./purchase-routes");
const saleRoutes = require("./sale-routes");
const inventoryRoutes = require("./inventory-routes");

const isAuth = require("../api/middleware/is-auth");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", isAuth, usersRoutes);
router.use("/companies", isAuth, companyRoutes);
router.use("/products", isAuth, productRoutes);
router.use("/purchases", isAuth, purchaseRoutes);
router.use("/sales", isAuth, saleRoutes);
router.use("/inventory", isAuth, inventoryRoutes);

module.exports = router;
