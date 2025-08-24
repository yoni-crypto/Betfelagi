const express = require('express');
const { getUserProfile, getUserHouses, uploadProfileImage } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer');


const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile-images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
    },
});
const upload = multer({ storage });


router.get('/profile', protect, getUserProfile);
router.get('/:userId/houses',  getUserHouses);
router.post('/upload-profile-image', protect, upload.single('profileImage'), uploadProfileImage);

module.exports = router;
