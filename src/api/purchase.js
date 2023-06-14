const PurchaseService = require("../services/purchase-service");
const { errorHandler } = require("../utils/error_handling");
const { validate } = require("./validation");
const { purchaseOrderSchema } = require("./validation/purchase");

const service = new PurchaseService();

async function addPurchaseOrder(req, res) {
  try {
    const cleanFields = await validate(purchaseOrderSchema, req.body);
    const salesmanId = req.user.id;
    const purchases = await service.CreatePurchase(salesmanId, {
      ...cleanFields,
    });
    return res.status(201).json({ message: "success", data: { purchases } });
  } catch (error) {
    return errorHandler(res, error, { logKey: "addPurchaseOrder API" });
  }
}

async function listPurchaseOrder(req, res) {
  try {
    const { invoiceNo } = req.query;
    const purchaseOrders = await service.purchaseOrderList({ invoiceNo });
    return res
      .status(200)
      .json({ message: "success", data: { purchaseOrders } });
  } catch (error) {
    return errorHandler(res, error, { logKey: "listPurchaseOrder" });
  }
}

module.exports = { addPurchaseOrder, listPurchaseOrder };
