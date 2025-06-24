const db = require('../db/db');

// ✅ Lấy tất cả vé
exports.getAllTickets = (req, res) => {
  db.query('SELECT * FROM Tickets', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// ✅ Lấy 1 vé theo ID
exports.getTicketById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Tickets WHERE ticket_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Không tìm thấy vé' });
    res.json(results[0]);
  });
};

// ✅ Lấy danh sách ghế đã đặt theo showtime_id
exports.getTicketsByShowtime = (req, res) => {
  const showtime_id = req.params.showtime_id;
  db.query(
    'SELECT seat_row, seat_column FROM Tickets WHERE showtime_id = ? AND status = "Booked"',
    [showtime_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// ✅ Tạo vé mới
exports.createTicket = (req, res) => {
  const { showtime_id, customer_id, seat_row, seat_column, price, status } = req.body;

  // Kiểm tra xem ghế đã được đặt chưa
  db.query(
    'SELECT * FROM Tickets WHERE showtime_id = ? AND seat_row = ? AND seat_column = ? AND status = "Booked"',
    [showtime_id, seat_row, seat_column],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
        return res.status(400).json({ error: 'Ghế này đã được đặt' });
      }

      // Chưa bị trùng, tiến hành đặt vé
      const sql = `INSERT INTO Tickets (showtime_id, customer_id, seat_row, seat_column, price, status)
                   VALUES (?, ?, ?, ?, ?, ?)`;
      db.query(sql, [showtime_id, customer_id, seat_row, seat_column, price, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Đặt vé thành công', id: result.insertId });
      });
    }
  );
};

// ✅ Cập nhật vé
exports.updateTicket = (req, res) => {
  const id = req.params.id;
  const ticket = req.body;
  db.query('UPDATE Tickets SET ? WHERE ticket_id = ?', [ticket, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cập nhật vé thành công' });
  });
};

// ✅ Xóa vé
exports.deleteTicket = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Tickets WHERE ticket_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Xóa vé thành công' });
  });
};
// ✅ Lấy danh sách ghế đã đặt theo showtime_id
// Chức năng này sẽ được sử dụng trong BookingPage để hiển thị ghế đã đặt
exports.getBookedSeats = (req, res) => {
  const showtimeId = req.params.showtimeId;
  const sql = 'SELECT seat_row, seat_column FROM Tickets WHERE showtime_id = ? AND status = "Booked"';
  db.query(sql, [showtimeId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Trả về dạng label giống như BookingPage dùng
    const seats = results.map(seat => `${seat.seat_row}${seat.seat_column}`);
    res.json(seats);
  });
};

