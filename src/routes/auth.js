const express = require("express");
const { adminSignup, login } = require("../api/auth");

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", login);

module.exports = router;
