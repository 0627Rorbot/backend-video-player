const express = require("express");
const { getLiveVideo, getVideosByDate } = require("../controllers/videoController");

const router = express.Router();

router.get("/live", getLiveVideo);
router.get("/calendar", getVideosByDate);

module.exports = router;
