const db = require('../db/db');

exports.getAllCustomers = (req, res) => {
  db.query('SELECT * FROM Customers', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getCustomerById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Customers WHERE customer_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.createCustomer = (req, res) => {
  const customer = req.body;
  db.query('INSERT INTO Customers SET ?', customer, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Customer created', id: result.insertId });
  });
};

exports.updateCustomer = (req, res) => {
  const id = req.params.id;
  const customer = req.body;
  db.query('UPDATE Customers SET ? WHERE customer_id = ?', [customer, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Customer updated' });
  });
};

exports.deleteCustomer = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Customers WHERE customer_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Customer deleted' });
  });
};
