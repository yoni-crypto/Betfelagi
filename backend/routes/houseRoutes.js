const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { createHouse, getAllHouses, getHouseById, getFilteredHouses, editHouse, deleteHouse } = require('../controllers/houseController');
const cloudinary = require('../config/cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');



const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'uploads/'),
//     filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage });
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'house-images', // Optional: folder name in Cloudinary
      allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
    },
  });
  const upload = multer({ storage });

router.post('/add', protect, upload.array('images', 5), createHouse);
router.get('/get', getAllHouses);
router.get('/filter',getFilteredHouses)
router.delete('/delete/:id',protect,deleteHouse)
router.put('/edit/:id', protect, upload.array('images', 5), editHouse);
router.get('/:id', getHouseById);

module.exports = router;
