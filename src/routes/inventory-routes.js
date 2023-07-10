const express = require("express");
const inventoryApi = require("../api/inventory");
// const isAdmin = require("../api/middleware/is-admin");

const router = express.Router();

router.get("/", inventoryApi.getProductInventory); // get product inventory
router.post("/stock/issue", inventoryApi.issueToGodown); // issue/transfer stock to godown
router.post("/stock/receive", inventoryApi.receiveFromGodown); // receive stock from godown

module.exports = router;
