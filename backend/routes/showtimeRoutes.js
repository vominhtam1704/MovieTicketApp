const express = require('express');
const router = express.Router();
const showtimeController = require('../controllers/showtimeController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', showtimeController.getAllShowtimes);
router.get('/:id', showtimeController.getShowtimeById);
router.post('/', verifyToken, isAdmin, showtimeController.createShowtime);
router.put('/:id', verifyToken, isAdmin, showtimeController.updateShowtime);
router.delete('/:id', verifyToken, isAdmin, showtimeController.deleteShowtime);

module.exports = router;