const Users = require ('../models/users')
const bcrypt = require ('../lib/bcrypt')
const jwt = require ('../lib/jwt')

function getAll () {
    return Users.find ({})
}

function getByEmail (email) {
    return Users.findOne({ email})
}

function signUp ({name, lastName, userName, email, password}) {
    const userFound = await Users.findOne({email: email})

    if (userFound) {
        throw new Error ('User already exists')
    }

    const encriptedPassword = await bcrypt.hash(password)

    return Users.create ({name, lastName, userName, email, password: encriptedPassword})
}

// function sigIn ¿?

async function signIn (email, password) {
    const userFound = await Users.findOne({email})

    if (!userFound) {
        throw new Error ('Invalid data')
    }

    const validPass = await bcrypt.compare (password, userFound.password)

    if (!validPass) {
        throw new Error ('Invalid data')
    }

    return jwt.sign({id: userFound._id})
}

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
    signIn,
    updateById,
    deleteById
}