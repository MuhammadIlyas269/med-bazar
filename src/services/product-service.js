const db = require("../database/models");
const { BadRequest } = require("../utils/error_handling/app-errors");

class ProductService {
  async CreateProduct({
    name,
    packSize,
    rate,
    tradePrice,
    salePrice,
    bonus,
    discount,
    salesTax,
    boxSize,
    companyId,
  }) {
    const company = await db.Company.findByPk(companyId);
    if (!company) throw new BadRequest({ message: "invalid company id " });
    const product = await db.Product.create({
      name,
      packSize,
      rate,
      tradePrice,
      salePrice,
      bonus,
      discount,
      salesTax,
      boxSize,
    });

    await company.addCompanyProduct(product);
    return product;
  }
}

module.exports = ProductService;
