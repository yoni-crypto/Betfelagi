const House = require('../models/House');
const path = require('path');
const fs = require('fs');

const createHouse = async (req, res) => {
    const { title, description, price, location, category, type } = req.body;
    const imageUrls = req.files ? req.files.map(file => file.path) : [];

    try {
        const house = await House.create({
            title,
            description,
            price,
            location,
            images: imageUrls,
            user: req.user.id,
            category,
            type,
        });
        res.status(201).json({ message: 'House listed successfully', house });
    } catch (error) {
        res.status(400).json({ message: 'Listing failed', error });
    }
};


const getAllHouses = async (req, res) => {
    const { page = 1, limit = 20 } = req.query; 
    try {
        const houses = await House.find()
            .populate('user', 'username email phoneNumber')
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalHouses = await House.countDocuments();

        res.json({
            houses,
            totalHouses,
            currentPage: Number(page),
            totalPages: Math.ceil(totalHouses / limit),
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch listings', error });
    }
};

const getFilteredHouses = async (req, res) => {
    const { priceRange, type, category, page = 1, limit = 20 } = req.query;
    try {
        const query = {};

        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            query.price = { $gte: minPrice, $lte: maxPrice };
        }

        if (type) {
            query.type = type;
        }

        if (category) {
            query.category = category;
        }

        const houses = await House.find(query)
            .populate('user', 'username email phoneNumber')
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalHouses = await House.countDocuments(query);

        res.json({
            houses,
            totalHouses,
            currentPage: Number(page),
            totalPages: Math.ceil(totalHouses / limit),
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch filtered listings', error });
    }
};

const getHouseById = async (req, res) => {
    try {
        const house = await House.findById(req.params.id).populate('user', 'username email phoneNumber firstName lastName profileImage');
        if (!house) return res.status(404).json({ message: 'House not found' });
        res.json(house);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch house', error });
    }
};

const deleteHouse = async (req, res) => {
    try {
        const house = await House.findById(req.params.id);
        if (!house) return res.status(404).json({ message: 'House not found' });

        if (house.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own listings' });
        }

        await House.findByIdAndDelete(req.params.id);
        res.json({ message: 'House deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete house', error });
    }
};

const editHouse = async (req, res) => {
    const { title, description, price, location, category, type, imagesToRemove } = req.body;
    const imageUrls = req.files ? req.files.map(file => file.path) : [];

    try {
        const house = await House.findById(req.params.id);
        if (!house) return res.status(404).json({ message: 'House not found' });

        if (house.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only edit your own listings' });
        }

        // Update house fields
        house.title = title || house.title;
        house.description = description || house.description;
        house.price = price || house.price;
        house.location = location || house.location;
        house.category = category || house.category;
        house.type = type || house.type;

        // Remove specified images from Cloudinary
        if (imagesToRemove && Array.isArray(imagesToRemove)) {
            house.images = house.images.filter(img => !imagesToRemove.includes(img));
        }

        // Append new images if any
        if (imageUrls.length > 0) {
            house.images = [...house.images, ...imageUrls];
        }

        await house.save();
        res.json({ message: 'House updated successfully', house });
    } catch (error) {
        console.error('Error updating house:', error);
        res.status(500).json({ message: 'Failed to update house', error });
    }
};


module.exports = { createHouse, getAllHouses, getHouseById, getFilteredHouses, deleteHouse, editHouse };
