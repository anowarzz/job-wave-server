const AppError = require("../utils/appError");
const ErrorTypes = require("../utils/errorTypes");

/**
 * Error handling middleware
 * Processes all errors and returns consistent error responses to clients
 */
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Set defaults
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  let errorType = err.errorType || ErrorTypes.SERVER_ERROR;

  // Handle MongoDB errors
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
    errorType = ErrorTypes.VALIDATION_ERROR;
  }

  // Handle MongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    message = `Duplicate value for ${Object.keys(err.keyValue).join(", ")}`;
    errorType = ErrorTypes.VALIDATION_ERROR;
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    errorType = ErrorTypes.VALIDATION_ERROR;
  }

  // Production vs development error handling
  if (process.env.NODE_ENV === "production") {
    // In production, don't send error stack and technical details
    return res.status(statusCode).json({
      success: false,
      errorType,
      message,
    });
  }

  // In development, send more details
  return res.status(statusCode).json({
    success: false,
    errorType,
    message,
    stack: err.stack,
    error: err,
  });
};

/**
 * Catch async errors in route handlers
 * This avoids having to use try-catch in every controller
 */

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = {
  errorHandler,
  catchAsync,
};
