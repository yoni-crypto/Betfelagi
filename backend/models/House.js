const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: { type: [String], required: true }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ['Rent', 'Sell'], required: true },
    bedrooms: { type: Number, default: 1 },
    bathrooms: { type: Number, default: 1 },
    area: { type: Number, default: 0 },
    isExternalListing: { type: Boolean, default: false },
    externalId: { type: String, unique: true, sparse: true },
    lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('House', HouseSchema);
