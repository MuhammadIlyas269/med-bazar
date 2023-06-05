const { BadRequest } = require("../../utils/error_handling/app-errors");
async function validate(schema, fields) {
  try {
    return await schema.validate(fields, { stripUnknown: true });
  } catch (e) {
    throw new BadRequest({ message: e.message });
  }
}

module.exports = { validate };
