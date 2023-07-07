const InventoryService = require("../services/inventory-service");
const { errorHandler } = require("../utils/error_handling");

const service = new InventoryService();

async function getProductInventory(req, res) {
  try {
    const inventory = await service.getInventory();
    return res.status(200).json({ message: "success", data: inventory });
  } catch (error) {
    return errorHandler(res, error, { logKey: "getProductInventory API" });
  }
}
module.exports = { getProductInventory };
