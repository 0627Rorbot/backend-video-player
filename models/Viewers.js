const mongoose = require("mongoose");

const ViewersSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  hour: Number,
  viewers: { type: Number, default: 0 },
});

module.exports = mongoose.model("Viewers", ViewersSchema);
