const { object, string, number, array, boolean } = require("yup");

const saleSchema = object().shape({
  productId: string().uuid().required(),
  productName: string().required(),
  rate: number().required().positive(),
  quantity: number().required().positive().integer(),
  discount: number().default(0).min(0).max(99),
});

const salesOrderSchema = object().shape({
  orderList: array().of(saleSchema).required(),
  remarks: string(),
  warranty: boolean().default(false),
  title: boolean().default(false),
});

module.exports = { saleSchema, salesOrderSchema };
