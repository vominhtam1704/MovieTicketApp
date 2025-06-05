const db = require('../db/db');

exports.getAllReports = (req, res) => {
  db.query('SELECT * FROM Reports', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getReportById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Reports WHERE report_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.createReport = (req, res) => {
  const report = req.body;
  db.query('INSERT INTO Reports SET ?', report, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Report created', id: result.insertId });
  });
};

exports.updateReport = (req, res) => {
  const id = req.params.id;
  const report = req.body;
  db.query('UPDATE Reports SET ? WHERE report_id = ?', [report, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Report updated' });
  });
};

exports.deleteReport = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Reports WHERE report_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Report deleted' });
  });
};
