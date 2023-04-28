const { ValidationError } = require("yup");

module.exports = async function (schema, fields) {
  try {
    return await schema.validate(fields, { stripeUnknown: true });
  } catch (e) {
    throw new ValidationError(e);
  }
};
