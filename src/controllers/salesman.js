const db = require("../models");
const { salesmanSchema } = require("../utils/validation/salesman");
const validate = require("../utils/validate");
const { HttpError } = require("../utils/custom-errors");
const errorHandler = require("../utils/error-handler");

async function addSalesman(req, res) {
  try {
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
      throw new HttpError({
        message: `${salesman.username} is already exist`,
        statusCode: 422,
      });
    }
    return res
      .status(201)
      .json({ message: "Salesman created successfully", salesman });
  } catch (err) {
    return errorHandler(res, err, { logKey: "addSalesman" });
  }
}

async function removeSalesman(req, res) {
  try {
    const { id } = req.params;

    const salesman = await db.User.destroy({ where: { id } });
    if (!salesman) {
      throw HttpError({
        message: "Provide a valid Salesman Id",
        statusCode: 400,
      });
    }
    return res.status(200).json({ message: "Successfully Removed.." });
  } catch (e) {
    return errorHandler(res, e, { logKey: "removeSalesman" });
  }
}

async function getSalesman(req, res) {
  try {
    const { id } = req.params;
    const salesman = await db.User.findByPk(id);
    if (!salesman) {
      throw new HttpError({
        message: "Provide a valid salesman Id",
        statusCode: 400,
      });
    }
    return res.status(200).json({ message: "Success", salesman });
  } catch (e) {
    return errorHandler(res, e, { logKey: "getSalesman" });
  }
}

async function getAllSalesman(req, res) {
  try {
    const salesmen = await db.User.findAll({ where: { role: "salesman" } });

    return res.status(200).json({ message: "Success", salesmen });
  } catch (e) {
    return errorHandler(res, e, { logKey: "getAllSalesman" });
  }
}

// view password
module.exports = { addSalesman, removeSalesman, getSalesman, getAllSalesman };
