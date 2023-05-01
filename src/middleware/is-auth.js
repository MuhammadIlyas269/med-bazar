const jwt = require("jsonwebtoken");
const { HttpError } = require("../utils/custom-errors");
const errorHandler = require("../utils/error-handler");
require("dotenv").config();

module.exports = async function authMiddleware(req, res, next) {
  try {
    const authToken = req.headers["authorization"];
    if (!authToken) {
      throw new HttpError({
        message: "Unauthorized - Headers are missing",
        statusCode: 401,
      });
    }
    jwt.verify(authToken, process.env.SECRET, function (err, decoded) {
      if (err) {
        throw new HttpError({
          message: "Unauthorized - Headers are missing 1",
          statusCode: 401,
        });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    return errorHandler(res, err);
  }
};
