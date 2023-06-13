const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const Product = require("./product-model");

const Inventory = sequelize.define("Inventory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  godownBalance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Product.hasOne(Inventory, { foreignKey: "productId", onDelete: "CASCADE" });

module.exports = Inventory;
