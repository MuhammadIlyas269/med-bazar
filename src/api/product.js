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
    return errorHandler(res, error, { logKey: "addProduct" });
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
    await service.UpdateProduct(id, { ...cleanFields });
    return res.status(200).json({ message: "updated", data: {} });
  } catch (error) {
    return errorHandler(res, error, { logKey: "editProduct" });
  }
}

async function removeProduct(req, res) {
  try {
    const id = req.params.id;
    await service.RemoveProduct(id);
    return res.status(200).json({ message: "success", data: {} });
  } catch (error) {
    return errorHandler(res, error, { logKey: "removeProduct" });
  }
}

async function productListing(req, res) {
  try {
    const { name } = req.query;
    const products = await service.ProductListing({ name });
    return res.status(200).json({ message: "success", data: { products } });
  } catch (error) {
    return errorHandler(res, error, { logKey: "productListing" });
  }
}

async function companyProductListing(req, res) {
  try {
    const companyId = req.params.id;
    const products = await service.companyProductListing(companyId);
    return res.status(200).json({ message: "success", data: products });
  } catch (error) {
    return errorHandler(res, error, { logKey: "companyProductListing" });
  }
}

module.exports = {
  addProduct,
  productDetail,
  editProduct,
  removeProduct,
  productListing,
  companyProductListing,
};
