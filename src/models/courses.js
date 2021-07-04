const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
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
    categoryId: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Course = mongoose.model('courses', courseSchema);

module.exports = Course;