const express = require("express");
const { adminSignup } = require("../controllers/auth");

const router = express.Router();

router.post("/create", adminSignup);

module.exports = router;
