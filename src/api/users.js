const { salesmanSchema } = require("./validation/user");
const { validate } = require("./validation");
const { errorHandler } = require("../utils/error_handling");
const UserService = require("../services/user-service");

const service = new UserService();

// POST: /users
async function addSalesman(req, res) {
  try {
    const cleanFields = await validate(salesmanSchema, req.body);
    const salesman = await service.CreateSalesman({ ...cleanFields });

    return res.status(201).json({ message: "success", data: salesman });
  } catch (err) {
    return errorHandler(res, err, { logKey: "addSalesman" });
  }
}

// DELETE: /users
async function removeSalesman(req, res) {
  try {
    const id = req.params.id;
    await service.RemoveSalesman({ id });
    return res.status(200).json({ message: "success" });
  } catch (e) {
    return errorHandler(res, e, { logKey: "removeSalesman" });
  }
}

// GET: /users/:id
async function getSalesman(req, res) {
  try {
    const id = req.params.id;
    const salesman = await service.SalesmanDetail({ id });

    return res.status(200).json({ message: "success", data: salesman });
  } catch (e) {
    return errorHandler(res, e, { logKey: "getSalesman" });
  }
}

// GET: /users
async function getAllSalesman(req, res) {
  try {
    const salesmen = await service.SalesmenListing();

    return res.status(200).json({ message: "success", data: salesmen });
  } catch (e) {
    return errorHandler(res, e, { logKey: "getAllSalesman" });
  }
}

// view password

module.exports = { addSalesman, removeSalesman, getSalesman, getAllSalesman };
