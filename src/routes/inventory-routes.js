const express = require("express");
const inventoryApi = require("../api/inventory");
// const isAdmin = require("../api/middleware/is-admin");

const router = express.Router();

router.get("/", inventoryApi.getProductInventory); // get product inventory

module.exports = router;
