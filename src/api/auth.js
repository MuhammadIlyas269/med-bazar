const { adminSignupSchema, loginSchema } = require("./validation/auth");
const { validate } = require("./validation");
const { errorHandler } = require("../utils/error_handling");
const UserService = require("../services/user-service");

const service = new UserService();

// POST: /auth/signup
async function adminSignup(req, res) {
  try {
    const cleanFields = await validate(adminSignupSchema, req.body);
    await service.CreateAdmin({ ...cleanFields });
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return errorHandler(res, err, { logKey: "Admin Signup" });
  }
}

//POST: /auth/login
async function login(req, res) {
  try {
    const cleanFields = await validate(loginSchema, req.body);
    const { user, token } = await service.LoginUser({ ...cleanFields });
    return res.status(200).json({ message: "success", user, token });
  } catch (e) {
    return errorHandler(res, err, { logKey: "Login" });
  }
}

// Password Change API

module.exports = { adminSignup, login };
