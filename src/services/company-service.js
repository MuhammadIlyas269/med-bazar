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

  async UpdateCompany(id, { name, creditBalance, debitBalance, address }) {
    const company = await db.Company.update(
      { name, creditBalance, debitBalance, address },
      { where: { id } }
    );
    console.log(company);
    if (company[0] !== 1) {
      throw new BadRequest({ message: "invalid company id" });
    }
    return;
  }

  async GetCompanyDetail({ id }) {
    const company = await db.Company.findByPk(id);
    if (!company) {
      throw new BadRequest({ message: "invalid company id" });
    }
    return company;
  }
}

module.exports = CompanyService;
