const sequelize = require("../database/connection");
const db = require("../database/models");
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
}

module.exports = SaleService;
