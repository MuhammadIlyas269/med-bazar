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

async function removeSalesman(req, res) {
  try {
    const { id } = req.params;

    const salesman = await db.User.destroy({ where: { id } });
    if (!salesman) {
      return res.status(400).json({ message: "Provide a valid Salesman Id" });
    }
    return res.status(200).json({ message: "Successfully Removed.." });
  } catch (e) {
    return res.status(500).json({ message: "Error From removeSalesman API" });
  }
}

async function getSalesman(req, res) {
  try {
    const { id } = req.params;
    const salesman = await db.User.findByPk(id);
    if (!salesman) {
      return res.status(400).json({ message: "Provide a valid salesman Id" });
    }
    return res.status(200).json({ message: "Success", salesman });
  } catch (e) {
    return res.status(500).json({ message: "Error From removeSalesman API" });
  }
}

async function getAllSalesman(req, res) {
  try {
    const salesmen = await db.User.findAll({ where: { role: "salesman" } });

    return res.status(200).json({ message: "Success", salesmen });
  } catch (e) {
    return res.status(500).json({ message: "Error From removeSalesman API" });
  }
}

// view password
module.exports = { addSalesman, removeSalesman, getSalesman, getAllSalesman };
