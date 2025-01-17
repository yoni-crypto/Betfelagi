const User = require('../models/User');
const House = require('../models/House');

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
            },
            listings: houses,
        });
    } catch (error) {
        console.error('Error fetching houses:', error);
        res.status(500).json({ message: 'Failed to fetch houses', error });
    }
};



module.exports = {
    getUserProfile,
    getUserHouses,
};
