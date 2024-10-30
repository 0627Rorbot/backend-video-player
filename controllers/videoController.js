// backend/controllers/videoController.js

const Video = require('../models/Video');

// Fetch all videos
const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllVideos,
};
