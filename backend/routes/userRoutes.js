const express = require('express');
const { getUserProfile, getUserHouses } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile-images', // Optional Cloudinary folder name
        allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed formats
    },
});
const upload = multer({ storage });


router.get('/profile', protect, getUserProfile);
router.get('/:userId/houses',  getUserHouses);
router.post('/upload-profile-image', protect, upload.single('profileImage'), uploadProfileImage);

module.exports = router;
