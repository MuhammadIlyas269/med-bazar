const { AppError } = require("./app-errors");

const errorHandler = (
  response,
  error,
  options = { logKey: " ", message: " " }
) => {
  const { logKey, message } = options;
  let errorMessage = " Internal Server Error";
  let statusCode = 500;
  if (error instanceof AppError) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  } else if (message) {
    errorMessage = message;
  }
  if (logKey) {
    console.log(`Error (${logKey}): `, error);
  }
  return response.status(statusCode).json({ errorMessage });
};

module.exports = { errorHandler };
