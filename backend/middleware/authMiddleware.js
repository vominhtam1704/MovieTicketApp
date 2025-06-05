const jwt = require('jsonwebtoken');

// Kiểm tra và xác thực token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin người dùng vào req.user
    next(); // Tiếp tục với các middleware hoặc route controller tiếp theo
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

// Kiểm tra quyền Admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: "You do not have permission to access this resource." });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
