const express = require("express");
const salesmanController = require("../controllers/salesman");
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");

const router = express.Router();

router.post("/add", isAuth, isAdmin, salesmanController.addSalesman);
router.get("/:id", isAuth, isAdmin, salesmanController.getSalesman);
router.delete(
  "/remove/:id",
  isAuth,
  isAdmin,
  salesmanController.removeSalesman
);

module.exports = router;
