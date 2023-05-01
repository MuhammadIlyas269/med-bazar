const { HttpError } = require("./custom-errors");

module.exports = (response, error, options = { logKey: "" }) => {
  let message = "Internal Server Error";
  let statusCode = 500;
  const { logKey } = options;
  if (error instanceof HttpError) {
    message = error.message;
    statusCode = error.statusCode;
  }
  if (logKey) {
    console.log(`${logKey}`, error);
  }
  return response.status(statusCode).json({ message });
};
