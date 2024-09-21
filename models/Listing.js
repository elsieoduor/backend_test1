const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    tripDetails: {
        dates: String,
        itinerary: String,
        highlights: String,
    },
    costs: Number,
    savingOptions: String,
});

module.exports = mongoose.model('Listing', ListingSchema);
