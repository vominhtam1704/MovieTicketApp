const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);
router.post('/', verifyToken, isAdmin, ticketController.createTicket);
router.put('/:id', verifyToken, isAdmin, ticketController.updateTicket);
router.delete('/:id', verifyToken, isAdmin, ticketController.deleteTicket);

module.exports = router;
