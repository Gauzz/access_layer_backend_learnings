const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    authToken: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
}, {
    strict: true
});

module.exports = mongoose.model('User', userSchema);