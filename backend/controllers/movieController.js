const connection = require('../db/db');

// Thêm phim mới
exports.createMovie = (req, res) => {
  const { title, genre, director, release_date } = req.body;
  let image = null;
  let video = null;

  if (req.files && req.files.image) {
    image = '/uploads/' + req.files.image[0].filename;
  }
  if (req.files && req.files.video) {
    video = '/uploads/' + req.files.video[0].filename;
  }

  const sql = 'INSERT INTO movies (title, genre, director, release_date, image, video) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [title, genre, director, release_date, image, video], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Movie created', id: result.insertId });
  });
};

// Sửa phim (giữ nguyên ảnh/video cũ nếu không upload mới)
exports.updateMovie = (req, res) => {
  const { title, genre, director, release_date } = req.body;

  // Lấy dữ liệu cũ từ DB nếu không có file mới
  connection.query('SELECT image, video FROM movies WHERE movie_id=?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    let image = results[0]?.image || null;
    let video = results[0]?.video || null;

    if (req.files && req.files.image) {
      image = '/uploads/' + req.files.image[0].filename;
    }
    if (req.files && req.files.video) {
      video = '/uploads/' + req.files.video[0].filename;
    }

    const sql = 'UPDATE movies SET title=?, genre=?, director=?, release_date=?, image=?, video=? WHERE movie_id=?';
    connection.query(sql, [title, genre, director, release_date, image, video, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Movie updated' });
    });
  });
};

// Lấy tất cả phim
exports.getAllMovies = (req, res) => {
  connection.query('SELECT * FROM movies', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Xóa phim
exports.deleteMovie = (req, res) => {
  connection.query('DELETE FROM movies WHERE movie_id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Movie deleted' });
  });
};