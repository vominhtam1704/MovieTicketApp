const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const upload = require('../upload');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Thêm phim
router.post(
  '/',
  verifyToken,
  isAdmin,
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]),
  movieController.createMovie
);

// Sửa phim
router.put(
  '/:id',
  verifyToken,
  isAdmin,
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]),
  movieController.updateMovie
);

// Lấy tất cả phim
router.get('/', movieController.getAllMovies);

// Xóa phim
router.delete('/:id', verifyToken, isAdmin, movieController.deleteMovie);

module.exports = router;