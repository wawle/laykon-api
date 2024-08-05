const express = require("express");
const { createLog } = require("../controllers/logs");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/").post(protect, createLog);

module.exports = router;
