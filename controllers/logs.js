const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Create new log
// @route     POST /api/v1/logs
// @access    Private
exports.createLog = asyncHandler(async (req, res, next) => {
  console.log({ body: req.body });

  res.status(201).json({
    success: true,
    data: req.body,
  });
});
