var express = require('express');
var router = express.Router();
const { userSchema } = require('../helpers/validationSchema');
const { RESPONSE_STATUS, ENUMS, MESSAGE } = require('../config/constants');
const { CoreLayerAPI } = require('../API/RESTClient');
const { RESTMethod, CORE } = require('../API/endpoints');
const { isValidPassword, encryptPassword } = require('../helpers/encryption');
const { signAccessToken } = require('../helpers/jwthelper');
const CustomError = require('../helpers/customError');

router.post('/register', async (req, res) => {
    try {
        const isValidRequest = await userSchema.validate(req.body);
        if (!isValidRequest.error) {
            let user = await fetchUser(req.body.email);
            if (user.data) {
                let isPassword = await isValidPassword(req.body.password, user.data.password);
                if (!isPassword) {
                    res.send({ status: RESPONSE_STATUS.STATUS_FAIL, message: MESSAGE.INVALID_PASSWORD });
                } else {
                    updateUserLoginLog(user._id, ENUMS.USERLOGINSTATUS.PASSED);
                    delete user.data._id;
                    delete user.data.password;
                    res.send({ status: RESPONSE_STATUS.STATUS_SUCCESS, data: user.data });
                }
            } else {
                let url = CORE.user.create;
                let method = RESTMethod.POST;
                let data = { "userName": req.body.userName, "email": req.body.email }
                user = await CoreLayerAPI({ url, method, data });
                let hashedPassword = await encryptPassword(req.body.password);
                let authToken = await signAccessToken(user);
                url = CORE.user.update + '?email=' + req.body.email;
                method = RESTMethod.POST;
                data = { "authToken": authToken, "password": hashedPassword }
                user = await CoreLayerAPI({ url, method, data });
                user = await fetchUser(req.body.email);
                updateUserLoginLog(user.data._id, ENUMS.USERLOGINSTATUS.PASSED);
                delete user.data._id;
                delete user.data.password;
                res.send({ status: RESPONSE_STATUS.STATUS_SUCCESS, data: user.data });
            }
        } else
            res.send({ status: RESPONSE_STATUS.STATUS_FAIL, message: MESSAGE.BAD_REQUEST });

    } catch (err) {
        console.log(err);
        res.send({ status: RESPONSE_STATUS.STATUS_FAIL, message: err.message });
    }
});

function fetchUser(email) {
    try {
        return new Promise(async (resolve, reject) => {
            let url = CORE.user.get + '?email=' + email;
            let method = RESTMethod.GET;
            let user = await CoreLayerAPI({ url, method });
            resolve(user);
        });
    } catch (err) {
        console.log(err);
        reject(err)
    }
}

function updateUserLoginLog(id, status) {
    return new Promise(async (resolve, reject) => {
        try {
            let url = CORE.userLogin.create;
            let method = RESTMethod.POST;
            data = {
                userId: id,
                loginStatus: status
            };
            CoreLayerAPI({ url, method, data });
            resolve(true);
        } catch (err) {
            console.log(err);
            resolve(err)
        }
    });
}

module.exports = router;