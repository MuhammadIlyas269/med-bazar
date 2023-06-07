const db = require("../database/models");
const { BadRequest } = require("../utils/error_handling/app-errors");

class CompanyService {
  async CreateCompany({ name, creditBalance, debitBalance, address }) {
    let company = await db.Company.findOne({ where: { name } });
    if (company) {
      throw new BadRequest({ message: "company already exist" });
    }
    company = await db.Company.create({
      name,
      creditBalance,
      debitBalance,
      address,
    });
    return company;
  }
}

module.exports = CompanyService;
