const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const Product = require("./product-model");
const InventoryHistory = require("./inventory-history-model");

const ProductHistory = sequelize.define("ProductHistory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});

InventoryHistory.hasMany(ProductHistory, {
  foreignKey: "inventoryHistoryId",
  as: "products",
});

Product.hasMany(ProductHistory, {
  foreignKey: "productId",
  as: "history",
});

module.exports = ProductHistory;
