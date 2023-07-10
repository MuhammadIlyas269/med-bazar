const db = require("../database/models");
const { Op } = require("sequelize");
const { BadRequest, ApiError } = require("../utils/error_handling/app-errors");
const sequelize = require("../database/connection");

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
    const t = await sequelize.transaction();

    try {
      const product = await db.Product.create(
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
        { transaction: t }
      );

      await company.addCompanyProduct(product, { transaction: t });

      await db.Inventory.create(
        {
          balance: 0,
          godownBalance: 0,
          productId: product.id,
        },
        { transaction: t }
      );

      await t.commit();

      return product;
    } catch (error) {
      await t.rollback();
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new BadRequest({ message: "product name already exist" });
      }
      throw new ApiError({ message: "something bad happen" });
    }
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
    let filterCondition = {
      order: [["name", "ASC"]],
    };
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

  async companyProductListing(companyId) {
    const products = await db.Product.findAll({
      where: { companyId },
      attributes: ["id", "name", "packSize", "rate", "boxSize"],
      include: {
        model: db.Inventory,
        attributes: ["id", "balance", "godownBalance"],
      },
    });
    return products;
  }
}

module.exports = ProductService;
