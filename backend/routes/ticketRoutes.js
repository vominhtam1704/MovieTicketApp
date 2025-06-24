const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// ✅ Người dùng đăng nhập là có thể đặt vé
router.post('/', verifyToken, ticketController.createTicket);
router.get('/booked/:showtimeId', ticketController.getBookedSeats);
// ✅ Các chức năng dưới yêu cầu Admin
router.get('/', verifyToken, isAdmin, ticketController.getAllTickets);
router.get('/:id', verifyToken, isAdmin, ticketController.getTicketById);
router.put('/:id', verifyToken, isAdmin, ticketController.updateTicket);
router.delete('/:id', verifyToken, isAdmin, ticketController.deleteTicket);



module.exports = router;
