const User = require('../models/User');
const House = require('../models/House');
const cloudinary = require('../config/cloudinaryConfig');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const listings = await House.find({ user: req.user.id });

        res.status(200).json({
            user: {
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profileImage: user.profileImage,
            },
            listings: listings,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile', error });
    }
};
const getUserHouses = async (req, res) => {
    const { userId } = req.params;

    try {
        const houses = await House.find({ user: userId });
        if (houses.length === 0) {
            return res.status(404).json({ message: 'No houses found for this user' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            user: {
                username: user.username,
                phoneNumber: user.phoneNumber,
                email: user.email,
                profileImage: user.profileImage,
            },
            listings: houses,
        });
    } catch (error) {
        console.error('Error fetching houses:', error);
        res.status(500).json({ message: 'Failed to fetch houses', error });
    }
};



const uploadProfileImage = async (req, res) => {
    try {
        const { id } = req.user; // Assuming `req.user` is populated via authentication middleware
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Update user profile image
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'profile-images', // Optional: Cloudinary folder
        });

        user.profileImage = result.secure_url;
        await user.save();

        res.status(200).json({ message: 'Profile image updated successfully', profileImage: user.profileImage });
    } catch (error) {
        console.error('Error uploading profile image:', error);
        res.status(500).json({ message: 'Failed to upload profile image', error });
    }
};




module.exports = {
    getUserProfile,
    getUserHouses,
    uploadProfileImage,
};
