const db = require('../db/db');

exports.getAllPayments = (req, res) => {
  db.query('SELECT * FROM Payments', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getPaymentById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Payments WHERE payment_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.createPayment = (req, res) => {
  const payment = req.body;
  db.query('INSERT INTO Payments SET ?', payment, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Payment created', id: result.insertId });
  });
};

exports.updatePayment = (req, res) => {
  const id = req.params.id;
  const payment = req.body;
  db.query('UPDATE Payments SET ? WHERE payment_id = ?', [payment, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Payment updated' });
  });
};

exports.deletePayment = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Payments WHERE payment_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Payment deleted' });
  });
};
