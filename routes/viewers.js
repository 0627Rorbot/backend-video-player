const express = require("express");
const { updateViewersCount } = require("../controllers/viewersController");

const router = express.Router();

router.post("/", updateViewersCount);

module.exports = router;
