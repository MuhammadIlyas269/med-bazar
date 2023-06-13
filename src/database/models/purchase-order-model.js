const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const User = require("./user-model");

const PurchaseOrder = sequelize.define("PurchaseOrder", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  invoiceNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isUpdated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  updatedBy: {
    type: DataTypes.STRING,
  },
});

User.hasMany(PurchaseOrder, {
  foreignKey: "salesmanId",
  as: "salesman",
  onDelete: "SET NULL",
});

module.exports = PurchaseOrder;
