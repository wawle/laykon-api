const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const fs = require("fs");

// @desc      Create new log
// @route     POST /api/v1/logs
// @access    Private
exports.createLog = asyncHandler(async (req, res, next) => {
  const logFilePath = "logs.json";
  const message = JSON.stringify(req.body);
  fs.appendFile(logFilePath, message, (err) => {
    if (err) {
      // If the file doesn't exist, create it
      if (err.code === "ENOENT") {
        fs.writeFile(logFilePath, message, (err) => {
          if (err) {
            return next(
              new ErrorResponse(`Error creating log file: ${err}`),
              500
            );
          }
          console.log("Log message written to", logFilePath);
        });
      } else {
        return next(
          new ErrorResponse(`Error writing to log file: ${err}`),
          500
        );
      }
      return;
    }

    console.log("Log message written to", logFilePath);
  });

  res.status(201).json({
    success: true,
    data: req.body,
  });
});
