const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
router.post('/', verifyToken, isAdmin, paymentController.createPayment);
router.put('/:id', verifyToken, isAdmin, paymentController.updatePayment);
router.delete('/:id', verifyToken, isAdmin, paymentController.deletePayment);

module.exports = router;
