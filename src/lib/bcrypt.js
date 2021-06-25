const bcrypt = require('bcrypt');

function hash(plainText){
    return bcrypt.hash(plainText, 10)
}

module.exports = {
    ...bcrypt,
    hash
};