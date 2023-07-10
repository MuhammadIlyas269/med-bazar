const sequelize = require("../database/connection");
const db = require("../database/models");
const { BadRequest, ApiError } = require("../utils/error_handling/app-errors");

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
  async addInventory({ stockList, userId }) {
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

      const balance = record.balance - stockRecord.quantity;
      if (balance < 0)
        throw new BadRequest({ message: "product is insufficient" });

      return {
        ...record,
        balance,
        godownBalance: record.godownBalance + stockRecord.quantity,
      };
    });

    const productHistoryRecords = stockList.map((record) => {
      return {
        quantity: record.quantity,
        productId: record.id,
      };
    });

    const transaction = await sequelize.transaction();
    try {
      const createdInventoryHistory = await db.InventoryHistory.create(
        { userId, issue: true },
        { transaction }
      );

      const createdProductHistories =
        await db.InventoryProductHistory.bulkCreate(productHistoryRecords, {
          transaction,
        });

      // associate inventory history to product history
      await createdInventoryHistory.setProductHistory(createdProductHistories, {
        transaction,
      });

      // update inventory shop and godown balance
      await db.Inventory.bulkCreate(
        updatedStock,
        {
          updateOnDuplicate: ["balance", "godownBalance"],
        },
        { transaction }
      );
      transaction.commit();
    } catch (error) {
      transaction.rollback();
      console.log("Transaction Error", error);
      throw new ApiError({ message: "something bad happen in add inventory" });
    }
  }

  // stock receive from godown
  async receiveInventory({ stockList, userId }) {
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

      const godownBalance = record.godownBalance - stockRecord.quantity;
      if (godownBalance < 0)
        throw new BadRequest({ message: "product is insufficient" });

      return {
        ...record,
        balance: record.balance + stockRecord.quantity,
        godownBalance,
      };
    });

    const productHistoryRecords = stockList.map((record) => {
      return {
        quantity: record.quantity,
        productId: record.id,
      };
    });

    const transaction = await sequelize.transaction();

    try {
      const createdInventoryHistory = await db.InventoryHistory.create(
        { userId, receive: true },
        { transaction }
      );

      const createdProductHistories =
        await db.InventoryProductHistory.bulkCreate(productHistoryRecords, {
          transaction,
        });

      // associate inventory history to product history
      await createdInventoryHistory.setProductHistory(createdProductHistories, {
        transaction,
      });

      // update inventory shop and godown balance
      await db.Inventory.bulkCreate(
        updatedStock,
        {
          updateOnDuplicate: ["balance", "godownBalance"],
        },
        { transaction }
      );

      transaction.commit();
    } catch (error) {
      transaction.rollback();

      console.log("Transaction Error", error);
      throw new ApiError({
        message: "something bad happen in receive inventory",
      });
    }
  }

  async getInventoryHistory(userId) {
    const history = await db.InventoryHistory.findAll({ where: { userId } });
    return history;
  }

  async getInventoryProductHistory(inventoryHistoryId) {
    const history = await db.InventoryProductHistory.findAll({
      where: { inventoryHistoryId },
      attributes: {
        exclude: ["inventoryHistoryId", "id"],
      },
    });
    return history;
  }
}

module.exports = InventoryService;
