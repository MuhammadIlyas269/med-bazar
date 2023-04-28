const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue("password", hash);
    },
  },
  role: {
    type: DataTypes.ENUM("admin", "salesman", "superAdmin"),
    defaultValue: "salesman",
  },
});

User.prototype.verifyPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

User.prototype.generateToken = function () {
  return jwt.sign(
    { id: this.id, username: this.username },
    process.env.SECRET,
    { expiresIn: "23h" }
  );
};
module.exports = User;
