const Video = require("../models/Video");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

exports.getLiveVideo = async (req, res) => {
  try {
    // Find the most recent video by date and time
    const latestVideo = await Video.findOne().sort({ uploadDate: -1 });
    if (!latestVideo) return res.status(404).json({ message: "No videos found" });

    // Send the video data and necessary S3 URLs
    res.status(200).json(latestVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVideosByDate = async (req, res) => {
  try {
    const { date } = req.query; // Format: YYYY-MM-DD
    const videos = await Video.find({
      uploadDate: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
      },
    });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
