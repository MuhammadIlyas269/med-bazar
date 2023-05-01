const { HttpError } = require("./custom-errors");

module.exports = async function (schema, fields) {
  try {
    return await schema.validate(fields, { stripeUnknown: true });
  } catch (e) {
    throw new HttpError({ message: e.message, statusCode: 400 });
  }
};
