const db = require('../db/db');

exports.getAllShowtimes = (req, res) => {
  db.query('SELECT * FROM Showtimes', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getShowtimeById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Showtimes WHERE showtime_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.createShowtime = (req, res) => {
  const showtime = req.body;
  db.query('INSERT INTO Showtimes SET ?', showtime, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Showtime created', id: result.insertId });
  });
};

exports.updateShowtime = (req, res) => {
  const id = req.params.id;
  const showtime = req.body;
  db.query('UPDATE Showtimes SET ? WHERE showtime_id = ?', [showtime, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Showtime updated' });
  });
};

exports.deleteShowtime = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Showtimes WHERE showtime_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Showtime deleted' });
  });
};
