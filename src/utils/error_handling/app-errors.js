const STATUS_CODES = {
  OK: 200,
  OK_CREATED: 201,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class AppError extends Error {
  message;
  statusCode;
  constructor({ message, statusCode }) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

class ApiError extends AppError {
  constructor({
    message = "Something bad happen -- try later",
    statusCode = STATUS_CODES.INTERNAL_ERROR,
  }) {
    super({ message, statusCode });
  }
}

class BadRequest extends AppError {
  constructor({
    message = "Bad request",
    statusCode = STATUS_CODES.BAD_REQUEST,
  }) {
    super({ message, statusCode });
  }
}

class UnAuthorized extends AppError {
  constructor({
    message = "Unauthorized",
    statusCode = STATUS_CODES.UN_AUTHORIZED,
  }) {
    super({ message, statusCode });
  }
}

class NotFound extends AppError {
  constructor({ message = "Not Found", statusCode = STATUS_CODES.NOT_FOUND }) {
    super({ message, statusCode });
  }
}

module.exports = {
  AppError,
  ApiError,
  NotFound,
  UnAuthorized,
  BadRequest,
  STATUS_CODES,
};
