const { object, string, number, array } = require("yup");

const stockSchema = object().shape({
  id: string().uuid().required(),
  quantity: number().required().min(1),
});

const stockListSchema = object().shape({
  stockList: array().of(stockSchema).required(),
});

module.exports = { stockListSchema };
