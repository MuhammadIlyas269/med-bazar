const { object, string, ema } = require("yup");

const adminSignupSchema = object().shape({
  username: string().required(),
  email: string().email().required(),
  password: string().min(5).max(20).required(),
});

module.exports = { adminSignupSchema };
