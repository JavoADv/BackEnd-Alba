const jwt = require('jsonwebtoken');

//const JWT_SECRET = 'supersecretword'

function sign(payload) {
    return jwt.sign(payload, process.env.JTW_SECRET, { expiresIn: '1d' })
}

function verify(token) {
    return jwt.verify(token, process.env.JTW_SECRET,)
}

module.exports = {
    ...jwt, sign, verify
}