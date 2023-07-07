const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const Product = require("./product-model");
const Inventory = require("./inventory-model");
const SalesOrder = require("./sale-order-model");

const Sale = sequelize.define("Sale", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rate: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  discount: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

Product.hasMany(Sale, {
  foreignKey: "productId",
  as: "sales",
  onDelete: "SET NULL",
});

SalesOrder.hasMany(Sale, {
  foreignKey: "saleOrderId",
  as: "sales",
  onDelete: "SET NULL",
});

Sale.afterBulkCreate(async function (sales, options) {
  const products = await Product.findAll({
    where: { id: sales.map((sale) => sale.productId) },
    include: {
      model: Inventory,
      attributes: ["id", "balance", "godownBalance"],
    },
    attributes: ["id"],
  });

  // console.log("Products");
  const inventoryList = products.map((product) => {
    if (product.Inventory?.id) {
      return {
        id: product.Inventory.id,
        productId: product.id,
        balance: product.Inventory.balance,
        godownBalance: product.Inventory.godownBalance,
      };
    }
  });

  const stockUpdateBalance = sales.map((sale) => {
    const inventoryObj = inventoryList.find(
      (inventory) => inventory.productId === sale.productId
    );

    return {
      id: inventoryObj.id,
      productId: sale.productId,
      balance: inventoryObj.balance - sale.quantity,
      godownBalance: inventoryObj.godownBalance,
    };
  });

  await Inventory.bulkCreate(stockUpdateBalance, {
    updateOnDuplicate: ["balance", "godownBalance"],
  });
});

module.exports = Sale;
