const { object, string, number } = require("yup");

const companySchema = object().shape({
  name: string().required(),
  address: string().required(),
  creditBalance: number().required(),
  debitBalance: number().required(),
});

module.exports = { companySchema };
