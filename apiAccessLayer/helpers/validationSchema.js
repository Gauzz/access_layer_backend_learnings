const joi = require("joi");

const userSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().required().min(8).max(16),
    userName: joi.string()
});

module.exports = {
    userSchema,
};
