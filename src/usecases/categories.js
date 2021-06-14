const Category = require('../models/categories');

function getAll() {
    return Category.find({});
}
function getById(id) {
    return Category.findById(id)
}

function getByTitle(title) {
    return Category.find({ title })
}

function create({ title, description }) {
    return Category.create({ title, description })
}

function updateById(id, dataToUpdate){
    return Category.findByIdAndUpdate(id, dataToUpdate, { useFindAndModify: false})
}
function deleteById(id) {
    return Category.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    getByTitle,
    create,
    updateById,
    deleteById
}