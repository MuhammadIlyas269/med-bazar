const InventoryService = require("../services/inventory-service");
const { errorHandler } = require("../utils/error_handling");
const { validate } = require("./validation");
const { stockListSchema } = require("./validation/inventory");

const service = new InventoryService();

async function getProductInventory(req, res) {
  try {
    const inventory = await service.getInventory();
    return res.status(200).json({ message: "success", data: inventory });
  } catch (error) {
    return errorHandler(res, error, { logKey: "getProductInventory API" });
  }
}

async function issueToGodown(req, res) {
  try {
    const cleanFields = await validate(stockListSchema, req.body);

    await service.addInventory({
      ...cleanFields,
      userId: req.user.id,
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return errorHandler(res, error, { logKey: "issueToGodown API" });
  }
}

async function receiveFromGodown(req, res) {
  try {
    const cleanFields = await validate(stockListSchema, req.body);

    await service.receiveInventory({
      ...cleanFields,
      userId: req.user.id,
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return errorHandler(res, error, { logKey: "issueToGodown API" });
  }
}
module.exports = { getProductInventory, issueToGodown, receiveFromGodown };
