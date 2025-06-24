import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Spinner, Alert, Modal } from 'react-bootstrap';
import { FaRegLightbulb, FaLightbulb, FaPlayCircle } from 'react-icons/fa';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Không tìm thấy phim!');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;
  if (!movie) return null;

  const themeBg = darkMode ? "#181c2b" : "#e8eaf6";
  const themeText = darkMode ? "#fff" : "#222";
  const infoBg = darkMode ? "#23244a" : "#fff";
  const borderColor = darkMode ? "#30336b" : "#c5cae9";

  return (
    <div style={{ background: themeBg, minHeight: "100vh", color: themeText }}>
      <div style={{ position: 'fixed', top: 24, right: 36, zIndex: 1000, cursor: 'pointer', fontSize: 28 }}
           onClick={() => setDarkMode(!darkMode)} title="Chuyển chế độ sáng/tối">
        {darkMode ? <FaLightbulb /> : <FaRegLightbulb />}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
        <div style={{ background: infoBg, borderRadius: 28, padding: 40, maxWidth: 1100, width: '100%', border: `2px solid ${borderColor}` }}>
          <div style={{ display: 'flex', gap: 40 }}>
            <div style={{ flex: '0 0 340px' }}>
              <img
                src={movie.image ? `http://localhost:5000${movie.image}` : "https://via.placeholder.com/400x600?text=Movie+Poster"}
                alt={movie.title}
                style={{ width: '100%', height: 480, objectFit: 'cover', borderRadius: 18, border: `1.5px solid ${borderColor}` }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontWeight: 900, fontSize: 38 }}>{movie.title}</h1>
              <p><strong>Thể loại:</strong> {movie.genre}</p>
              <p><strong>Đạo diễn:</strong> {movie.director}</p>
              <p><strong>Diễn viên chính:</strong> {movie.main_actor}</p>
              <p><strong>Thời lượng:</strong> {movie.duration} phút</p>
              <p><strong>Ngôn ngữ:</strong> {movie.language}</p>
              <p><strong>Quốc gia:</strong> {movie.country}</p>
              <p><strong>Ngày khởi chiếu:</strong> {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : ''}</p>
              <p><strong>Phụ đề:</strong> {movie.subtitle}</p>
              <p><strong>Độ tuổi:</strong> {movie.age}+</p>
              <p><strong>Mô tả:</strong> {movie.description}</p>
              <p><strong>Nội dung phim:</strong> {movie.content}</p>

              {movie.video && (
                <Button variant="outline-danger" onClick={() => setShowTrailer(true)} className="mb-3">
                  <FaPlayCircle style={{ marginRight: 10 }} /> Xem Trailer
                </Button>
              )}

              <div className="d-flex gap-3 mt-3">
                <Button variant="primary" onClick={() => navigate(`/booking/${movie.movie_id}`)}>Đặt vé</Button>
                <Button variant="secondary" onClick={() => navigate(-1)}>Quay lại</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Trailer */}
      <Modal show={showTrailer} onHide={() => setShowTrailer(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Trailer: {movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <video width="100%" height="420" controls autoPlay style={{ borderRadius: 10 }}>
            <source src={`http://localhost:5000${movie.video}`} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MovieDetailPage;
