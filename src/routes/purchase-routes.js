const express = require("express");
const purchaseApi = require("../api/purchase");

const router = express.Router();

router.post("/", purchaseApi.addPurchaseOrder); // add a new purchaseOrder

module.exports = router;
