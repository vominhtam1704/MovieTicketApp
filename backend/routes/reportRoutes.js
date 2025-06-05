const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.post('/', verifyToken, isAdmin, reportController.createReport);
router.put('/:id', verifyToken, isAdmin, reportController.updateReport);
router.delete('/:id', verifyToken, isAdmin, reportController.deleteReport);

module.exports = router;
