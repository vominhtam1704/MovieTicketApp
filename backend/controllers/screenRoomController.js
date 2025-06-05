const db = require('../db/db');

exports.getAllScreenRooms = (req, res) => {
  db.query('SELECT * FROM ScreenRooms', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getScreenRoomById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM ScreenRooms WHERE screenroom_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.createScreenRoom = (req, res) => {
  const room = req.body;
  db.query('INSERT INTO ScreenRooms SET ?', room, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Screen room created', id: result.insertId });
  });
};

exports.updateScreenRoom = (req, res) => {
  const id = req.params.id;
  const room = req.body;
  db.query('UPDATE ScreenRooms SET ? WHERE screenroom_id = ?', [room, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Screen room updated' });
  });
};

exports.deleteScreenRoom = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM ScreenRooms WHERE screenroom_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Screen room deleted' });
  });
};
