const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.token;

  // Make sure token exists
  if (token !== process.env.API_KEY) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  next();
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
