const express = require("express");
const userApi = require("../api/users");
const isAuth = require("../api/middleware/is-auth");
const isAdmin = require("../api/middleware/is-admin");

const router = express.Router();

router.post("/", isAuth, isAdmin, userApi.addSalesman); // add a new salesman
router.get("/", isAuth, isAdmin, userApi.getAllSalesman); //get a list of salesman
router.get("/:id", isAuth, isAdmin, userApi.getSalesman); // get salesman detail
router.delete("/:id", isAuth, isAdmin, userApi.removeSalesman); // remove a specific salesman

module.exports = router;
