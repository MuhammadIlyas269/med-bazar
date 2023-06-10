const { errorHandler } = require("../utils/error_handling");
const ProductService = require("../services/product-service");
const { validate } = require("./validation");
const { productSchema } = require("./validation/product");

const service = new ProductService();

async function addProduct(req, res) {
  try {
    const cleanFields = await validate(productSchema, req.body);
    const product = await service.CreateProduct({ ...cleanFields });
    return res.status(201).json({ message: "success", data: { product } });
  } catch (error) {
    let message;
    if (error.name === "SequelizeUniqueConstraintError") {
      message = "product name already exist";
    }
    return errorHandler(res, error, { logKey: "addProduct", message });
  }
}

module.exports = { addProduct };
