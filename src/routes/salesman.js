const express = require("express");
const salesmanController = require("../controllers/salesman");
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");

const router = express.Router();

router.post("/add", isAuth, isAdmin, salesmanController.addSalesman);

module.exports = router;
