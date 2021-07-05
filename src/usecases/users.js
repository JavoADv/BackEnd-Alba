const User = require('../models/users')
const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')

function getAll() {
    return User.find({})
}

function getByEmail(email) {
    return User.findOne({ email })
}

function getById(id) {
    return User.findById(id)
}

async function signUp({ name, lastName, userName, email, password, role }) {
    const userFound = await User.findOne({ email: email });
    if (userFound) {
        throw new Error('User already exists')
    }
    const encriptedPassword = await bcrypt.hash(password)

    return User.create({ name, lastName, userName, email, password: encriptedPassword, role })
}

// function sigIn ¿?

async function signIn(email, password) {
    const userFound = await User.findOne({ email })
    if (!userFound) throw new Error('Invalid data')
    const validPass = await bcrypt.compare(password, userFound.password)
    if (!validPass) throw new Error('Invalid data')
    
    return jwt.sign({ 
        id: userFound._id 
    })
}

async function updateById(id, dataToUpdate) {
    let encriptedPassword;
    if(dataToUpdate.password){
        encriptedPassword = await bcrypt.hash(dataToUpdate.password);
        dataToUpdate.password = encriptedPassword;
    }
    return User.findByIdAndUpdate(id, dataToUpdate)
}

function deleteById(id) {
    return User.findByIdAndDelete(id)
}

function getProfile(token) {
    const user = jwt.decode(token);
    return User.findById(user.id);
}

module.exports = {
    getAll,
    getByEmail,
    getById,
    signUp,
    signIn,
    updateById,
    deleteById,
    getProfile
}