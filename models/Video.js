const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: String,
  s3_key: String,
  thumbnail: String,
  metadata: {
    chapters: String,
    start: Number,
  },
  subtitles: [String], // Array of subtitle file links
  uploadDate: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", VideoSchema);
