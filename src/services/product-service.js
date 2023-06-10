const db = require("../database/models");
const { Op } = require("sequelize");
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

  async GetProductDetail(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw new BadRequest({ message: "invalid product id" });
    return product;
  }

  async UpdateProduct(
    id,
    {
      name,
      packSize,
      rate,
      tradePrice,
      salePrice,
      bonus,
      discount,
      salesTax,
      boxSize,
    }
  ) {
    const product = await db.Product.update(
      {
        name,
        packSize,
        rate,
        tradePrice,
        salePrice,
        bonus,
        discount,
        salesTax,
        boxSize,
      },
      {
        where: {
          id,
        },
      }
    );
    if (product[0] !== 1) {
      throw new BadRequest({ message: "invalid product id" });
    }
  }

  async RemoveProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw new BadRequest({ message: "invalid product id" });
    await product.destroy();
  }

  async ProductListing({ name = "" }) {
    let filterCondition = {};
    if (name) {
      filterCondition.where = {
        name: {
          [Op.substring]: name.trim(),
        },
      };
    }
    const products = await db.Product.findAll(filterCondition);
    return products;
  }
}

module.exports = ProductService;
