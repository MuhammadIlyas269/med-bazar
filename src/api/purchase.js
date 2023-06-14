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

module.exports = { addPurchaseOrder };
