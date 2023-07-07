const db = require("../database/models");

class InventoryService {
  async getInventory() {
    const productInventory = await db.Inventory.findAll({
      attributes: {
        exclude: ["updatedAt", "productId"],
      },
      include: {
        model: db.Product,
      },
    });
    return productInventory;
  }
}

module.exports = InventoryService;
