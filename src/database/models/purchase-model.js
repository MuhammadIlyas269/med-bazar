const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const Product = require("./product-model");
const PurchaseOrder = require("./purchase-order-model");
const Inventory = require("./inventory-model");

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
  foreignKey: "purchaseOrderId",
  as: "purchases",
  onDelete: "SET NULL",
});

Purchase.afterBulkCreate(async function (purchases, options) {
  const products = await Product.findAll({
    where: { id: purchases.map((purchase) => purchase.productId) },
    include: {
      model: Inventory,
      attributes: ["id", "balance", "godownBalance"],
    },
    attributes: ["id"],
  });

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

  const stockUpdateBalance = purchases.map((purchase) => {
    const inventoryObj = inventoryList.find(
      (inventory) => inventory.productId === purchase.productId
    );

    return {
      id: inventoryObj.id,
      productId: purchase.productId,
      balance: purchase.quantity + inventoryObj.balance,
      godownBalance: inventoryObj.godownBalance,
    };
  });

  await Inventory.bulkCreate(stockUpdateBalance, {
    updateOnDuplicate: ["balance", "godownBalance"],
  });
});

module.exports = Purchase;
