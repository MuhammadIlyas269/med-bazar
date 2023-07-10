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

  // stock transfer to godown
  async addInventory({ stockList }) {
    const inventory = await db.Inventory.findAll({
      where: { productId: stockList.map((record) => record.id) },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      raw: true,
    });

    const updatedStock = inventory.map((record) => {
      const stockRecord = stockList.find((stock) => {
        return stock.id === record.productId;
      });

      return {
        ...record,
        balance: record.balance - stockRecord.quantity,
        godownBalance: record.godownBalance + stockRecord.quantity,
      };
    });

    const update = await db.Inventory.bulkCreate(updatedStock, {
      updateOnDuplicate: ["balance", "godownBalance"],
    });
  }

  // stock receive from godown
  async receiveInventory({ stockList }) {
    const inventory = await db.Inventory.findAll({
      where: { productId: stockList.map((record) => record.id) },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      raw: true,
    });

    const updatedStock = inventory.map((record) => {
      const stockRecord = stockList.find((stock) => {
        return stock.id === record.productId;
      });

      return {
        ...record,
        balance: record.balance + stockRecord.quantity,
        godownBalance: record.godownBalance - stockRecord.quantity,
      };
    });

    const update = await db.Inventory.bulkCreate(updatedStock, {
      updateOnDuplicate: ["balance", "godownBalance"],
    });
  }
}

module.exports = InventoryService;
