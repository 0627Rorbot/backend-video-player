const Viewers = require("../models/Viewers");

exports.updateViewersCount = async (req, res) => {
  try {
    const { date, hour, viewers } = req.body;

    const viewerRecord = await Viewers.findOneAndUpdate(
      { date, hour },
      { viewers },
      { new: true, upsert: true }
    );

    res.status(200).json(viewerRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
