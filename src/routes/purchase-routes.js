const express = require("express");
const purchaseApi = require("../api/purchase");

const router = express.Router();

router.post("/", purchaseApi.addPurchaseOrder); // add a new purchaseOrder
router.get("/", purchaseApi.listPurchaseOrder); // list purchaseOrders
router.get("/:id", purchaseApi.purchaseOrderDetail); // purchaseOrder detail

module.exports = router;
