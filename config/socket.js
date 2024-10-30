// backend/config/socket.js

const Video = require('../models/Video');

const setupSocket = (io) => {
    let viewers = {};

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('viewer_joined', async (videoId) => {
            if (videoId) {
                viewers[socket.id] = videoId;
                const video = await Video.findById(videoId);
                if (video) {
                    video.viewerCount += 1;
                    await video.save();
                    io.emit('update_viewers', { videoId, viewerCount: video.viewerCount });
                }
            }
        });

        socket.on('disconnect', async () => {
            const videoId = viewers[socket.id];
            delete viewers[socket.id];
            if (videoId) {
                const video = await Video.findById(videoId);
                if (video) {
                    video.viewerCount -= 1;
                    await video.save();
                    io.emit('update_viewers', { videoId, viewerCount: video.viewerCount });
                }
            }
            console.log('Client disconnected:', socket.id);
        });
    });
};

module.exports = setupSocket;
