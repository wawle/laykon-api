const express = require("express");
const { createLog } = require("../controllers/logs");

const router = express.Router();

router.route("/").post(createLog);

module.exports = router;
