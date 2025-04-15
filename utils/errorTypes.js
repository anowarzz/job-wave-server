
//  Centralized error types for consistent error handling across the application
 
const ErrorTypes = {
  // Database related errors
  DATABASE_ERROR: "DatabaseError",
  VALIDATION_ERROR: "ValidationError",
  NOT_FOUND_ERROR: "NotFoundError",

  // Authentication and authorization errors
  AUTH_ERROR: "AuthError",
  FORBIDDEN_ERROR: "ForbiddenError",

  // Input related errors
  BAD_REQUEST_ERROR: "BadRequestError",

  // Server errors
  SERVER_ERROR: "ServerError",
};

module.exports = ErrorTypes;
