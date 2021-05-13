const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    displayName: { type: String },
    key: { type: String },
    url: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
}, {
    strict: true
});

module.exports = mongoose.model('File', fileSchema);