const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async function authMiddleware(req, res, next) {
  try {
    const authToken = req.headers["authorization"];
    if (!authToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Headers are missing" });
    }
    jwt.verify(authToken, process.env.SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Headers are missing 1" });
      }
      req.user = decoded;
      next();
    });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
