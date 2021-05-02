const mongoose = require('mongoose');
const UserLoginSchema = new mongoose.Schema({
    userId: { type: mongoose.ObjectId },
    location: { type: String },
    loginStatus: { type: String, enum: ["Passed", "Failed"] },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
}, {
    strict: true
});

module.exports = mongoose.model('userLogin', UserLoginSchema);