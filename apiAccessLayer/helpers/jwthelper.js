const jwt = require("jsonwebtoken");
const encryption = require("../helpers/encryption");
module.exports = {
    signAccessToken: (data) => {
        return new Promise((resolve, reject) => {
            const payload = data;
            const secret = process.env.SECRET;
            const options = {};
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) reject({
                    "status": 400,
                    "error": err
                });
                resolve(token);

            });
        });
    },
    verifyAccessToken: (token) => {
        return jwt.verify(token, process.env.SECRET);
    },
    // checkPassword : (password, passHash) => {
    //     let encryptSHA3 = encryption.encryptSHA3(password);
    //     return encryptSHA3 === passHash;
    // }

};