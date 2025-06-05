const db = require('../db/db');

exports.getAllTickets = (req, res) => {
  db.query('SELECT * FROM Tickets', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getTicketById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Tickets WHERE ticket_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.createTicket = (req, res) => {
  const ticket = req.body;
  db.query('INSERT INTO Tickets SET ?', ticket, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Ticket created', id: result.insertId });
  });
};

exports.updateTicket = (req, res) => {
  const id = req.params.id;
  const ticket = req.body;
  db.query('UPDATE Tickets SET ? WHERE ticket_id = ?', [ticket, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Ticket updated' });
  });
};

exports.deleteTicket = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Tickets WHERE ticket_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Ticket deleted' });
  });
};
