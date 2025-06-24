const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const upload = require('../middleware/uploadMiddleware');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// ✅ Tìm kiếm phim theo từ khóa (?q=abc) – đặt TRƯỚC /:id để tránh nhầm
router.get('/search', movieController.searchMovies);

// ✅ Public: Lấy tất cả phim và lấy phim theo ID
router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

// ✅ Admin: Thêm phim (có upload ảnh/video)
router.post(
  '/',
  verifyToken,
  isAdmin,
  upload.fields([{ name: 'image' }, { name: 'video' }]),
  movieController.createMovie
);

// ✅ Admin: Sửa phim (có thể giữ hoặc thay ảnh/video)
router.put(
  '/:id',
  verifyToken,
  isAdmin,
  upload.fields([{ name: 'image' }, { name: 'video' }]),
  movieController.updateMovie
);

// ✅ Admin: Xóa phim
router.delete(
  '/:id',
  verifyToken,
  isAdmin,
  movieController.deleteMovie
);

module.exports = router;
