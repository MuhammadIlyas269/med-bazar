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

async function productDetail(req, res) {
  try {
    const id = req.params.id;
    const product = await service.GetProductDetail(id);
    return res.status(201).json({ message: "success", data: { product } });
  } catch (error) {
    return errorHandler(res, error, { logKey: "productDetail" });
  }
}

async function editProduct(req, res) {
  try {
    const id = req.params.id;
    const cleanFields = await validate(productSchema, req.body);
    await service.Update(id, { ...cleanFields });
    return res.status(200).json({ message: "updated", data: {} });
  } catch (error) {
    return errorHandler(res, error, { logKey: "editProduct" });
  }
}
module.exports = { addProduct, productDetail, editProduct };
