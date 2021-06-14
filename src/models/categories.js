const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLenght: 2
    },
    description: {
        type: String,
        required: true,
        minLenght: 2
    }
});

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;