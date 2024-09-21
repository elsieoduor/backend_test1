const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    interests: [String],
    goals: [String],
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
