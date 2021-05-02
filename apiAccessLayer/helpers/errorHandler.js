const HttpStatus = require('http-status-codes');
const { MESSAGE } = require('../config/constants');

/**
 * catch-all error handler
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const genericErrorHandler = function (error, req, res, next) {
    res.status(error.status || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: {code: error.status || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, message: error.message || 'Something went wrong. Please try again'} });
};

/**
 * Unknown routes handler
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const unknownRoutesHandler = function (req, res, next) {
    const error = new Error('API not found');
    error.status = HttpStatus.StatusCodes.NOT_FOUND;
    next(error);
};

const getValidError = (error) => {
    return {
        error: {
            errorCode: error.errorCode || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message || MESSAGE.UNKNOWN_ERROR.message,
            desc : error.desc || null,
            status : error.status ? error.status :  'FAIL'
        }
    };
};

module.exports = {
    genericErrorHandler, unknownRoutesHandler, getValidError
};