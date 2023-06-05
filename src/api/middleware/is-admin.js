const { errorHandler } = require("../../utils/error_handling");
const { UnAuthorized } = require("../../utils/error_handling/app-errors");

module.exports = async function (req, res, next) {
  try {
    const isAdmin = req.user.role === "admin" ? true : false;
    if (!isAdmin) {
      throw new UnAuthorized({
        message: "not authorized to perform action",
      });
    }
    next();
  } catch (err) {
    return errorHandler(res, err, { logKey: "admin middleware error" });
  }
};
