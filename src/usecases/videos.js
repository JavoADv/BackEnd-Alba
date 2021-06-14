const Video = require('../models/videos');

function getAll() {
    return Video.find({});
}
function getById(id) {
    return Video.findById(id)
}

function create({ title, description, courseId, createdDate, url }) {
    return Video.create({ title, description, courseId, createdDate, url })
}

function updateById(id, dataToUpdate) {
    return Video.findByIdAndUpdate(id, dataToUpdate, { useFindAndModify: false })
}
function deleteById(id) {
    return Video.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}