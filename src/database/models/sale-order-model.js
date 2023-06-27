const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const User = require("./user-model");

const SalesOrder = sequelize.define("SaleOrder", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  invoiceNo: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    start: 1000,
  },
  remarks: {
    type: DataTypes.STRING,
  },
  updatedBy: {
    type: DataTypes.STRING,
  },
  warranty: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  title: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(SalesOrder, {
  foreignKey: "salesmanId",
  as: "salesOrders",
  onDelete: "SET NULL",
});

module.exports = SalesOrder;
