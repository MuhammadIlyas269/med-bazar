const jwt = require("jsonwebtoken");
const { errorHandler } = require("../../utils/error_handling");
const { UnAuthorized } = require("../../utils/error_handling/app-errors");
require("dotenv").config();

module.exports = async function authMiddleware(req, res, next) {
  try {
    const authToken = req.headers["authorization"];
    if (!authToken) {
      throw new UnAuthorized({
        message: "unauthorized - headers are missing",
      });
    }
    jwt.verify(authToken, process.env.SECRET, function (err, decoded) {
      if (err) {
        throw new UnAuthorized({
          message: "unauthorized - headers are missing",
        });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    return errorHandler(res, err, { logKey: "auth middleware error" });
  }
};
