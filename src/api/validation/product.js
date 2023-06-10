const { object, string, number } = require("yup");

const productSchema = object().shape({
  name: string().required(),
  packSize: number().required().positive().integer(),
  rate: number().required().positive(),
  tradePrice: number().required().positive(),
  salePrice: number().required().positive(),
  bonus: number().default(0), // bonus on sale
  discount: number().default(0),
  salesTax: number().required().positive(),
  boxSize: number().required().positive(),
  companyId: string().uuid(),
});

module.exports = { productSchema };
