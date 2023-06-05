const { object, string } = require("yup");

const salesmanSchema = object().shape({
  username: string().required(),
  password: string().required(),
});

module.exports = { salesmanSchema };
