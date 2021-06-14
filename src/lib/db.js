//mongodb+srv://albaapp:AlbaDB21@back-end-alba.r4qe1.mongodb.net/test

const mongoose = require ('mongoose')

const DB_USER = 'albaapp'
const DB_PASSWORD = 'AlbaDB21'
const DB_HOST = 'back-end-alba.r4qe1.mongodb.net'
const DB_NAME = 'test' //¿Hay que cambiarlo cuando se crea la DB?

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

function connect () {
    return mongoose.connect (url, {useNewUrlParser: true, useUnifiedTopology: true})
}

module.exports = connect 