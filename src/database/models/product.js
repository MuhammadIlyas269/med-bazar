const sequelize = require("../connection");
const { DataTypes } = require("sequelize");
const Company = require("./company");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  packSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rate: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  tradePrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  salePrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  bonus: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  discount: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  saleTax: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  boxSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // company name
  //category
});

// Association
Company.hasMany(Product, {
  foreignKey: "companyId",
  as: "companyProducts",
  onDelete: "SET NULL",
});

module.exports = Product;
