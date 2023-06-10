const express = require("express");
const productApi = require("../api/product");
const isAdmin = require("../api/middleware/is-admin");

const router = express.Router();

router.post("/", isAdmin, productApi.addProduct); // add a new product

module.exports = router;
