const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // lưu file vào thư mục /uploads
  },
  filename: (req, file, cb) => {
    // Tên file là timestamp + đuôi mở rộng
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Khởi tạo middleware upload
const upload = multer({ storage });

module.exports = upload;
