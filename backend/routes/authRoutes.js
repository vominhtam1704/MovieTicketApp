// routes/authRoutes.js

const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Route đăng ký
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    registerUser(req, res);
  }
);

// Route đăng nhập
router.post('/login', loginUser);

module.exports = router;
