const sequelize = require("../database/connection");
const db = require("../database/models");
const { Op } = require("sequelize");
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

  async purchaseOrderList({ invoiceNo = "" }) {
    let filterCondition = {};
    if (invoiceNo) {
      filterCondition.where = {
        invoiceNo: {
          [Op.startsWith]: invoiceNo.trim(),
        },
      };
    }
    const purchaseOrders = await db.PurchaseOrder.findAll(filterCondition, {
      order: [["createdAt", "DESC"]],
    });
    return purchaseOrders;
  }

  async purchaseOrderDetail(id) {
    const purchaseOrder = await db.PurchaseOrder.findByPk(id, {
      attributes: ["id"],
      include: [
        {
          model: db.Purchase,
          as: "purchases",
          attributes: [
            "id",
            "productName",
            "rate",
            "quantity",
            "total",
            "productId",
          ],
        },
      ],
    });
    // const purchaseOrder = await purchaseOrder.getPurchaseInvoice();
    return purchaseOrder.purchases;
  }
}

module.exports = PurchaseService;
