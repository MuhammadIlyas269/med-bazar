const sequelize = require("../database/connection");
const db = require("../database/models");
const { ApiError } = require("../utils/error_handling/app-errors");

class PurchaseService {
  async CreatePurchase(salesmanId, { orderList }) {
    const t = await sequelize.transaction();
    try {
      const purchaseOrder = await db.PurchaseOrder.create(
        { salesmanId },
        { transaction: t }
      );
      const id = purchaseOrder.id;

      orderList.map((purchase) => {
        purchase.purchaseOrderId = id;
        purchase.total = purchase.rate * purchase.quantity;
        return purchase;
      });

      await db.Purchase.bulkCreate(orderList, {
        transaction: t,
      });
      t.commit();
      return purchaseOrder;
    } catch (error) {
      console.log("error-name : ", error.name);
      console.log("error-message: ", error.message);
      t.rollback();
      throw new ApiError({ message: "something bad happen in purchaseOrder" });
    }
  }
}

module.exports = PurchaseService;
