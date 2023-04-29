const db = require("../models");
const { salesmanSchema } = require("../utils/validation/salesman");
const validate = require("../utils/validate");

async function addSalesman(req, res) {
  try {
    console.log("USer", req.user);
    const { username, password } = await validate(salesmanSchema, req.body);

    const [salesman, created] = await db.User.findOrCreate({
      where: {
        username,
      },
      defaults: {
        username,
        password,
      },
    });
    if (!created) {
      return res
        .status(422)
        .json({ message: `${salesman.username} is already exist` });
    }
    return res
      .status(201)
      .json({ message: "Salesman created successfully", salesman });
  } catch (e) {
    let statusCode = 500;
    let message = "Error in Create Salesman";
    if (e.name === "ValidationError") {
      statusCode = 422;
      message = e.message;
    }
    return res.status(statusCode).json({ message });
  }
}

module.exports = { addSalesman };
