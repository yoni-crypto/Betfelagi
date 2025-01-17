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
}, { timestamps: true });

module.exports = mongoose.model('House', HouseSchema);
