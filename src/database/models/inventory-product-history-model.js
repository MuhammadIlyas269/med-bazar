const sequelize = require("../connection");
const Product = require("./product-model");
const InventoryHistory = require("./inventory-history-model");
const { DataTypes } = require("sequelize");

const InventoryProductHistory = sequelize.define("InventoryProductHistory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Product.hasMany(InventoryProductHistory, {
  foreignKey: "productId",
  as: "history",
  //   onDelete: "SET NULL",
});
InventoryProductHistory.belongsTo(Product, { foreignKey: "productId" });

InventoryHistory.hasMany(InventoryProductHistory, {
  foreignKey: "inventoryHistoryId",
  as: "productHistory",
  //   onDelete: "SET NULL",
});
InventoryProductHistory.belongsTo(InventoryHistory, {
  foreignKey: "inventoryHistoryId",
});

module.exports = InventoryProductHistory;
