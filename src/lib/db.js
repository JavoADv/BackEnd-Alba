//mongodb+srv://albaapp:AlbaDB21@back-end-alba.r4qe1.mongodb.net/test

const mongoose = require ('mongoose')

const url = process.env.DB_URL

function connect () {
    return mongoose.connect (url, {useNewUrlParser: true, useUnifiedTopology: true})
}

module.exports = connect 