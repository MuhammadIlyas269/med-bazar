const { AppError } = require("./app-errors");

const errorHandler = (response, error, options = { logKey: " " }) => {
  const { logKey } = options;
  let message = " Internal Server Error";
  let statusCode = 500;
  if (error instanceof AppError) {
    message = error.message;
    statusCode = error.statusCode;
  }
  if (logKey) {
    console.log(`Error (${logKey}): `, error);
  }
  return response.status(statusCode).json({ message });
};

module.exports = { errorHandler };
