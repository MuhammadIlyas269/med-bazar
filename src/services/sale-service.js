const sequelize = require("../database/connection");
const db = require("../database/models");
const { Op } = require("sequelize");
const { ApiError } = require("../utils/error_handling/app-errors");

class SaleService {
  async CreateSale(salesmanId, { remarks, warranty, title, orderList }) {
    const t = await sequelize.transaction();
    const salesOrderArgs = {
      salesmanId,
      warranty,
      title,
    };
    if (remarks) {
      salesOrderArgs.remarks = remarks;
    }
    try {
      const saleOrder = await db.SalesOrder.create(salesOrderArgs, {
        transaction: t,
      });
      const id = saleOrder.id;
      console.log("Before Order: ", orderList);
      orderList.map((sale) => {
        sale.saleOrderId = id;
        let newRate = sale.rate;
        if (sale.discount > 0) {
          //calculate the discount percentage
          const result = sale.rate - (sale.discount / 100) * sale.rate;
          newRate = result;
        }
        sale.total = newRate * sale.quantity;
        return sale;
      });
      console.log("After Order: ", orderList);

      await db.Sale.bulkCreate(orderList, {
        transaction: t,
      });
      t.commit();
      return saleOrder;
    } catch (error) {
      console.log("error-name : ", error);
      console.log("error-message: ", error.message);
      t.rollback();
      throw new ApiError({ message: "something bad happen in saleOrder" });
    }
  }

  async saleOrderList({ invoiceNo = "" }) {
    let filterCondition = {};
    if (invoiceNo) {
      filterCondition.where = {
        invoiceNo: {
          [Op.startsWith]: invoiceNo.trim(),
        },
      };
    }
    const salesOrders = await db.SalesOrder.findAll(filterCondition, {
      order: [["createdAt", "DESC"]],
    });
    return salesOrders;
  }

  async saleOrderDetail(id) {
    const saleOrder = await db.SalesOrder.findByPk(id, {
      attributes: ["id"],
      include: [
        {
          model: db.Sale,
          as: "sales",
          attributes: [
            "id",
            "productName",
            "rate",
            "quantity",
            "total",
            "productId",
            "discount",
          ],
        },
      ],
    });
    // const purchaseOrder = await purchaseOrder.getPurchaseInvoice();
    if (!saleOrder)
      throw new BadRequest({ message: "sale order doesn't exist " });
    return saleOrder.sales;
  }
}

module.exports = SaleService;
