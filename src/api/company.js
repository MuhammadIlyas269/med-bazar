const { errorHandler } = require("../utils/error_handling");
const { companySchema } = require("./validation/company");
const { validate } = require("./validation");
const CompanyService = require("../services/company-service");

const service = new CompanyService();

async function addCompany(req, res) {
  try {
    const cleanFields = await validate(companySchema, req.body);
    const company = await service.CreateCompany({ ...cleanFields });
    return res.status(201).json({ message: "success", company });
  } catch (error) {
    return errorHandler(res, error, { logKey: "addCompany" });
  }
}

module.exports = { addCompany };
