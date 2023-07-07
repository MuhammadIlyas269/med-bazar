const SaleService = require("../services/sale-service");
const { errorHandler } = require("../utils/error_handling");
const { validate } = require("./validation");
const { salesOrderSchema } = require("./validation/sale");

const service = new SaleService();

async function addSales(req, res) {
  try {
    const cleanFields = await validate(salesOrderSchema, req.body);
    const salesmanId = req.user.id;
    const sales = await service.CreateSale(salesmanId, {
      ...cleanFields,
    });
    return res.status(201).json({ message: "success", data: { sales } });
  } catch (error) {
    return errorHandler(res, error, { logKey: "addSales API" });
  }
}

// delete Sales Order to update
// Trash Bin API

module.exports = { addSales };
