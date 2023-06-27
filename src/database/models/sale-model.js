const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const Product = require("./product-model");
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

module.exports = Sale;
