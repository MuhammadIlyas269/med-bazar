const { User } = require("../database/models");
const { BadRequest } = require("../utils/error_handling/app-errors");

class UserService {
  async CreateAdmin({ username, email, password }) {
    let admin = await User.findOne({ where: { role: "admin" } });

    // Restrict System to only allow 1 admin at a time
    if (admin) return;

    admin = await User.create({
      username,
      email,
      password,
      role: "admin",
    });
    return admin;
  }

  async LoginUser({ username, password }) {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new BadRequest({ message: "username is incorrect" });
    }
    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      throw new BadRequest({ message: "password is incorrect" });
    }
    const token = user.generateToken();
    return { user, token };
  }

  async CreateSalesman({ username, password }) {
    const [salesman, created] = await User.findOrCreate({
      where: {
        username,
      },
      defaults: {
        username,
        password,
      },
    });
    if (!created) {
      throw new BadRequest({
        message: `${salesman.username} is already exist`,
      });
    }
    return salesman;
  }

  async RemoveSalesman({ id }) {
    const salesman = await User.destroy({ where: { id, role: "salesman" } });
    if (!salesman) {
      throw new BadRequest({ message: "provide a valid salesman id" });
    }
  }

  async SalesmanDetail({ id }) {
    const salesman = await User.findByPk(id);
    if (!salesman) {
      throw new BadRequest({ message: "provide a valid salesman id" });
    }
    return salesman;
  }

  async SalesmenListing() {
    const salesmen = await User.findAll({ where: { role: "salesman" } });
    return salesmen;
  }
}

module.exports = UserService;
