require('dotenv').config();
// Import các thư viện cần thiết
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import các Routes
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const screenRoomRoutes = require('./routes/screenRoomRoutes');
const showtimeRoutes = require('./routes/showtimeRoutes');
const customerRoutes = require('./routes/customerRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Import các middleware
const { verifyToken, isAdmin } = require('./middleware/authMiddleware');

// Cấu hình dotenv để lấy các biến môi trường
dotenv.config();

// Khởi tạo express
const app = express();
const port = process.env.PORT || 5000;

app.use('/uploads', express.static('uploads'));
// Sử dụng các middleware chung
app.use(cors());
app.use(bodyParser.json()); // Xử lý body request kiểu JSON

// Đăng ký các Routes
// Auth routes (cho phép đăng ký và đăng nhập)
app.use('/api/auth', authRoutes);

// Các API yêu cầu xác thực token
app.use('/api/movies', movieRoutes);
app.use('/api/screenRooms', verifyToken, screenRoomRoutes);
app.use('/api/showtimes', verifyToken, showtimeRoutes);
app.use('/api/customers', verifyToken, customerRoutes);
app.use('/api/tickets', verifyToken, ticketRoutes);
app.use('/api/payments', verifyToken, paymentRoutes);
app.use('/api/reports', verifyToken, reportRoutes);

// Khởi tạo server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
