const mongoose = require('mongoose');

const InitiativeSchema = new mongoose.Schema({
    title: String,
    description: String,
    goals: String,
    cta: String,
});

module.exports = mongoose.model('Initiative', InitiativeSchema);
