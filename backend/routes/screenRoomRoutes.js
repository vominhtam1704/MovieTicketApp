const express = require('express');
const router = express.Router();
const screenRoomController = require('../controllers/screenRoomController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', screenRoomController.getAllScreenRooms);
router.get('/:id', screenRoomController.getScreenRoomById);
router.post('/', verifyToken, isAdmin, screenRoomController.createScreenRoom);
router.put('/:id', verifyToken, isAdmin, screenRoomController.updateScreenRoom);
router.delete('/:id', verifyToken, isAdmin, screenRoomController.deleteScreenRoom);

module.exports = router;
