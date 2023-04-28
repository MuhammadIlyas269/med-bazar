const express = require("express");
const { adminSignup, login } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", login);

module.exports = router;
