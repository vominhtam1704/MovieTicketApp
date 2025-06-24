const connection = require('../db/db');

// ✅ Lấy tất cả phim
exports.getAllMovies = (req, res) => {
  connection.query('SELECT * FROM movies', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// ✅ Lấy phim theo ID
exports.getMovieById = (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM movies WHERE movie_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Không tìm thấy phim' });
    res.json(results[0]);
  });
};

// ✅ Tìm kiếm phim theo tiêu đề
exports.searchMovies = (req, res) => {
  const keyword = req.query.q;
  if (!keyword) return res.status(400).json({ message: 'Thiếu từ khóa tìm kiếm' });

  const sql = `SELECT * FROM movies WHERE title LIKE ?`;
  connection.query(sql, [`%${keyword}%`], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// ✅ Thêm phim mới
exports.createMovie = (req, res) => {
  const {
    title, genre, director, main_actor, duration, language, country,
    release_date, description, subtitle, age, content
  } = req.body;

  const image = req.files?.image ? '/uploads/' + req.files.image[0].filename : null;
  const video = req.files?.video ? '/uploads/' + req.files.video[0].filename : null;

  const sql = `INSERT INTO movies
    (title, genre, director, main_actor, duration, language, country,
    release_date, description, image, video, subtitle, age, content)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(sql, [
    title, genre, director, main_actor, duration, language, country,
    release_date, description, image, video, subtitle, age, content
  ], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Thêm phim thành công' });
  });
};

// ✅ Cập nhật phim
exports.updateMovie = (req, res) => {
  const id = req.params.id;
  const {
    title, genre, director, main_actor, duration, language, country,
    release_date, description, subtitle, age, content
  } = req.body;

  // Lấy dữ liệu cũ từ DB để giữ lại ảnh/video nếu không cập nhật mới
  connection.query('SELECT image, video FROM movies WHERE movie_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    let oldImage = results[0]?.image || null;
    let oldVideo = results[0]?.video || null;

    const image = req.files?.image ? '/uploads/' + req.files.image[0].filename : oldImage;
    const video = req.files?.video ? '/uploads/' + req.files.video[0].filename : oldVideo;

    const sql = `UPDATE movies SET
      title = ?, genre = ?, director = ?, main_actor = ?, duration = ?, language = ?, country = ?,
      release_date = ?, description = ?, image = ?, video = ?, subtitle = ?, age = ?, content = ?
      WHERE movie_id = ?`;

    connection.query(sql, [
      title, genre, director, main_actor, duration, language, country,
      release_date, description, image, video, subtitle, age, content, id
    ], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Cập nhật phim thành công' });
    });
  });
};

// ✅ Xóa phim
exports.deleteMovie = (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM movies WHERE movie_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Xóa phim thành công' });
  });
};
// ✅ Lấy phim mới nhất
exports.getLatestMovies = (req, res) => {
  connection.query('SELECT * FROM movies ORDER BY release_date DESC LIMIT 10', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
}