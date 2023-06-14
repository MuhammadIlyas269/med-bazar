const express = require("express");
const purchaseApi = require("../api/purchase");

const router = express.Router();

router.post("/", purchaseApi.addPurchaseOrder); // add a new purchaseOrder
router.get("/", purchaseApi.listPurchaseOrder); // list purchaseOrders

module.exports = router;
