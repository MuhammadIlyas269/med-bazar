const db = require("../models");
const { adminSignupSchema, loginSchema } = require("../utils/validation/auth");
const validate = require("../utils/validate");
const { HttpError } = require("../utils/custom-errors");
const errorHandler = require("../utils/error-handler");

async function adminSignup(req, res) {
  try {
    const { username, password, email } = await validate(
      adminSignupSchema,
      req.body
    );
    const isExist = await db.User.findOne({ where: { role: "admin" } });

    // Restrict System to only allow 1 admin at a time
    if (isExist)
      return res.status(200).json({ message: "User Created Successfully 1" });

    await db.User.create({ username, password, email, role: "admin" });

    return res.status(200).json({ message: "User Created Successfully" });
  } catch (err) {
    return errorHandler(res, err, { logKey: "Admin Signup" });
  }
}

async function login(req, res) {
  try {
    const { username, password } = await validate(loginSchema, req.body);
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Username is Incorrect" });
    }
    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is Incorrect" });
    }
    const token = user.generateToken();

    return res.status(200).json({ message: "Success", user, token });
  } catch (e) {
    return errorHandler(res, err, { logKey: "Login" });
  }
}

// Password Change API

module.exports = { adminSignup, login };
