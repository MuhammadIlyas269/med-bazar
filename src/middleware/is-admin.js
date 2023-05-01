const { HttpError } = require("../utils/custom-errors");
const errorHandler = require("../utils/error-handler");

module.exports = async function (req, res, next) {
  try {
    const isAdmin = req.user.role === "admin" ? true : false;
    if (!isAdmin) {
      throw new HttpError({
        message: "You are not authorized",
        statusCode: 400,
      });
    }
    next();
  } catch (err) {
    return errorHandler(res, err);
  }
};
