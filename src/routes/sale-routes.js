const express = require("express");
const saleApi = require("../api/sale");

const router = express.Router();

router.post("/", saleApi.addSales); // add a new sales
router.get("/", saleApi.listSalesOrder); // list out sales
router.get("/:id", saleApi.saleOrderDetail); // get detail of sale

module.exports = router;
