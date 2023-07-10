const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const User = require("./user-model");

const InventoryHistory = sequelize.define("InventoryHistory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  issue: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  receive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(InventoryHistory, {
  foreignKey: "userId",
  as: "inventoryHistory",
  onDelete: "SET NULL",
});

module.exports = InventoryHistory;
