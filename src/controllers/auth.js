const db = require("../models");
const { adminSignupSchema } = require("../utils/validation/auth");
const validate = require("../utils/validate");

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
    console.log("Error In adminSignup Controller: ", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Error in adminSignup Controller" });
  }
}

module.exports = { adminSignup };
