const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const videoRoutes = require("./routes/videos");
const viewersRoutes = require("./routes/viewers");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.log(err));

app.use("/api/videos", videoRoutes);
app.use("/api/viewers", viewersRoutes);
