// backend/models/Video.js

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    viewerCount: { type: Number, default: 0 }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
