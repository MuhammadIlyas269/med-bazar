const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const Product = require("./product-model");
const PurchaseOrder = require("./purchase-order-model");

const Purchase = sequelize.define("Purchase", {
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
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

Product.hasMany(Purchase, {
  foreignKey: "productId",
  as: "purchaseProduct",
  onDelete: "SET NULL",
});

PurchaseOrder.hasMany(Purchase, {
  foreignKey: "invoiceId",
  as: "purchaseInvoice",
  onDelete: "SET NULL",
});

module.exports = Purchase;
