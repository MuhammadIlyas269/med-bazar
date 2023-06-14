const { object, string, number, array } = require("yup");

const purchaseSchema = object().shape({
  productName: string().required(),
  rate: number().required().positive(),
  quantity: number().required().positive().integer(),
  productId: string().uuid().required(),
});

const purchaseOrderSchema = object().shape({
  orderList: array().of(purchaseSchema).required(),
});

module.exports = { purchaseSchema, purchaseOrderSchema };
