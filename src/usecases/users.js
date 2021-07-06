const Users = require ('../models/users')
const bcrypt = require ('../lib/bcrypt')
const jwt = require ('../lib/jwt')

function getAll () {
    return Users.find ({})
}

function getByEmail (email) {
    return Users.findOne({ email})
}

function getById (id){
    return Users.findById(id)
}

async function signUp ({name, lastName, userName, email, password, role}) {
    const userFound = await Users.findOne({email: email})

    if (userFound) {
        throw new Error ('User already exists')
    }

    const encriptedPassword = await bcrypt.hash(password)

    return Users.create ({name, lastName, userName, email, password: encriptedPassword, role})
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

function getByRole (role) {
    return Users.find ({role})
}

module.exports = {
    getAll,
    getByEmail,
    getById,
    signUp,
    signIn,
    updateById,
    deleteById,
    getByRole
}