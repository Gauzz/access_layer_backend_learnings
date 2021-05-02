const bcrypt = require('bcrypt');
const saltRounds = 10;

async function encryptPassword(password) {
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    return hash;
}

async function isValidPassword(password, hash) {
    let result = await bcrypt.compare(password, hash);
    return result;
}

module.exports = {
    encryptPassword, isValidPassword
};