const Users = require ('../models/users')

function getAll () {
    return Users.find ({})
}

function getByEmail (email) {
    return Users.findById({ email})
}

function signUp ({name, lastName, userName, email, password}) {
    return Users,create ({name, lastName, userName, email, password})
}

// function sigIn ¿?

function updateById (id, dataToUpdate) {
    return Users.findByIdAndUpdate(id, dataToUpdate)
}

function deleteById (id) {
    return Users.findByIdAndDelete(id)
}

module.exports = {
    getAll,
    getByEmail,
    signUp,
    updateById,
    deleteById
}