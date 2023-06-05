const { object, string } = require("yup");

const adminSignupSchema = object().shape({
  username: string().required(),
  email: string().email().required(),
  password: string().min(5).max(20).required(),
});

const loginSchema = object().shape({
  username: string().required(),
  password: string().required(),
});

module.exports = { adminSignupSchema, loginSchema };
