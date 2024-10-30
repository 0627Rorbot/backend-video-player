// backend/server.js

const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Update with your frontend URL for security
        methods: ["GET", "POST"]
    }
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern-videos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(express.json());

// Video Schema and Model
const videoSchema = new mongoose.Schema({
    title: String,
    url: String,
    viewerCount: {
        type: Number,
        default: 0
    }
});

const Video = mongoose.model('Video', videoSchema);

// API to fetch videos
app.get('/api/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Handle socket connections for real-time updates
io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    // Update viewer count when a client joins
    socket.on('viewer_joined', async (videoId) => {
        if (videoId) {
            try {
                const video = await Video.findById(videoId);
                if (video) {
                    video.viewerCount += 1;
                    await video.save();
                    io.emit('update_viewers', { videoId, viewerCount: video.viewerCount });
                }
            } catch (err) {
                console.error(err);
            }
        }
    });

    // Update viewer count when a client disconnects
    socket.on('disconnect', async () => {
        console.log('Client disconnected', socket.id);
        // Logic to reduce viewer count if applicable can be added here
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
