const { errorHandler } = require("../utils/error_handling");
const { companySchema } = require("./validation/company");
const { validate } = require("./validation");
const CompanyService = require("../services/company-service");

const service = new CompanyService();

async function addCompany(req, res) {
  try {
    const cleanFields = await validate(companySchema, req.body);
    const company = await service.CreateCompany({ ...cleanFields });
    return res.status(201).json({ message: "success", data: { company } });
  } catch (error) {
    return errorHandler(res, error, { logKey: "addCompany" });
  }
}

async function updateCompany(req, res) {
  try {
    const cleanFields = await validate(companySchema, req.body);
    const id = req.params.id;
    await service.UpdateCompany(id, { ...cleanFields });
    return res.status(200).json({ message: "updated", data: {} });
  } catch (error) {
    let message;
    if (error.name === "SequelizeUniqueConstraintError") {
      message = "company name is already exist";
    }
    return errorHandler(res, error, { logKey: "updateCompany", message });
  }
}

module.exports = { addCompany, updateCompany };
