const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2
    },
    description: {
        type: String,
        required: true,
        minLength: 2
    },
    courseId: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const Video = mongoose.model('videos', videoSchema); 

module.exports = Video;