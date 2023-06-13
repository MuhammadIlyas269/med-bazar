const express = require("express");
const companyApi = require("../api/company");
const isAdmin = require("../api/middleware/is-admin");

const router = express.Router();

router.post("/", isAdmin, companyApi.addCompany); // add a new company
router.get("/", companyApi.listCompanies); // get companies list
router.put("/:id", isAdmin, companyApi.updateCompany); // update company
router.get("/:id", companyApi.companyDetail); // get company detail

module.exports = router;
