const Course = require('../models/courses');

function getAll() {
    return Course.find({});
}
function getById(id) {
    return Course.findById(id)
}

function getByCategory(categoryId) {
    return Course.findOne({ categoryId })
}

function create({ authorId, title, description, categoryId, createdDate, price, imgUrl, isFree }) {
    return Course.create({ authorId, title, description, categoryId, createdDate, price, imgUrl, isFree })
}

function updateById(id, dataToUpdate){
    return Course.findByIdAndUpdate(id, dataToUpdate, { useFindAndModify: false})
}
function deleteById(id) {
    return Course.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    getByCategory,
    create,
    updateById,
    deleteById
}