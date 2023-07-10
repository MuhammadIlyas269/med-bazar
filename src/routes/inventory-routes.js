const express = require("express");
const inventoryApi = require("../api/inventory");
// const isAdmin = require("../api/middleware/is-admin");

const router = express.Router();

router.get("/", inventoryApi.getProductInventory); // get product inventory
router.post("/stock/issue", inventoryApi.issueToGodown); // issue/transfer stock to godown
router.post("/stock/receive", inventoryApi.receiveFromGodown); // receive stock from godown
// all histories group by users
router.get("/histories/:id", inventoryApi.getInventoryHistoryDetail); // all histories of a specific user
router.get("/histories/users/:id", inventoryApi.getUserInventoryHistory); // all histories of a specific user

module.exports = router;
