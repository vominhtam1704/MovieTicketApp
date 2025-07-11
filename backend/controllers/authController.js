const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../db/db');

// Đăng ký người dùng
const registerUser = (req, res) => {
  const { username, email, password, role } = req.body;

  // Kiểm tra email đã tồn tại chưa
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) return res.status(400).json({ error: 'Email already exists' });

    // Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Thêm người dùng mới vào bảng users
    connection.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
};

// Đăng nhập người dùng
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Tìm người dùng theo email
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ error: 'Invalid email or password' });

    const user = results[0];

    // So sánh mật khẩu
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid email or password' });

    // Tạo JWT
    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // ✅ Trả về token và role
    res.json({
      message: 'Login successful',
      token,
      role: user.role
    });
  });
};

module.exports = { registerUser, loginUser };
