//  Extends the built-in Error class with additional properties

class AppError extends Error {
  constructor(message, statusCode, errorType = "AppError") {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
