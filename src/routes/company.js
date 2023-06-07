const express = require("express");
const companyApi = require("../api/company");
const isAuth = require("../api/middleware/is-auth");
const isAdmin = require("../api/middleware/is-admin");

const router = express.Router();

router.post("/", isAuth, isAdmin, companyApi.addCompany); // add a new company
router.put("/:id", isAuth, isAdmin, companyApi.updateCompany); // update company

module.exports = router;
