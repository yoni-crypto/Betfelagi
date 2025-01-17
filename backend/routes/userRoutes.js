const express = require('express');
const { getUserProfile, getUserHouses } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/profile', protect, getUserProfile);
router.get('/:userId/houses',  getUserHouses);

module.exports = router;
