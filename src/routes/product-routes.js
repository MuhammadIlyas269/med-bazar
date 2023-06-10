const express = require("express");
const productApi = require("../api/product");
const isAdmin = require("../api/middleware/is-admin");

const router = express.Router();

router.post("/", isAdmin, productApi.addProduct); // add a new product
router.get("/", productApi.productListing); // add a new product
router.get("/:id", productApi.productDetail); // get product detail
router.put("/:id", isAdmin, productApi.editProduct); // update product
router.delete("/:id", isAdmin, productApi.removeProduct); // remove product

module.exports = router;
