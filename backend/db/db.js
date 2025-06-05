// db/db.js

const dotenv = require('dotenv'); // Thêm dòng này
dotenv.config(); // Đảm bảo dòng này nằm sau dòng trên

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;