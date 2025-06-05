// Hàm kiểm tra dữ liệu hợp lệ (kiểm tra email, tên người dùng, v.v.)
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
};

const validateUsername = (username) => {
  return username.length >= 3;
};

module.exports = { validateEmail, validateUsername };
