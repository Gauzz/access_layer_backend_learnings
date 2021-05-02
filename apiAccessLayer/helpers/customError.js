class CustomError extends Error {
    constructor (error) {
        super(error.message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.errorCode = error.errorCode;
    }

    statusCode () {
        return this.errorCode;
    }
}

module.exports = CustomError;