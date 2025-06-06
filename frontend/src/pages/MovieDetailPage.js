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

  // Đổi màu đồng bộ cho toàn trang và khung thông tin
  const themeBg = darkMode ? "#181c2b" : "#e8eaf6";
  const themeText = darkMode ? "#fff" : "#222";
  const infoBg = darkMode ? "#23244a" : "#fff";
  const borderColor = darkMode ? "#30336b" : "#c5cae9";

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;
  if (!movie) return null;

  return (
    <div
      style={{
        background: themeBg,
        minHeight: "100vh",
        color: themeText,
        transition: "all 0.3s"
      }}
    >
      {/* Nút bóng đèn chuyển theme */}
      <div style={{
        position: 'fixed',
        top: 24,
        right: 36,
        zIndex: 1000,
        cursor: 'pointer',
        fontSize: 28,
        color: darkMode ? "#ffd600" : "#23244a"
      }}
        title={darkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <FaLightbulb /> : <FaRegLightbulb />}
      </div>

      {/* Nội dung căn giữa toàn trang */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '40px 0'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          background: infoBg,
          borderRadius: 28,
          boxShadow: darkMode
            ? '0 8px 32px rgba(0,0,0,0.5)'
            : '0 8px 32px rgba(44,62,80,0.10)',
          padding: 40,
          maxWidth: 1100,
          width: '100%',
          gap: 40,
          border: `2px solid ${borderColor}`,
          color: themeText
        }}>
          {/* Poster bên trái */}
          <div style={{
            flex: '0 0 340px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <img
              src={movie.image ? `http://localhost:5000${movie.image}` : "https://via.placeholder.com/400x600?text=Movie+Poster"}
              alt={movie.title}
              style={{
                width: 340,
                height: 480,
                objectFit: 'cover',
                borderRadius: 18,
                background: "#fff",
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                border: `1.5px solid ${borderColor}`
              }}
            />
          </div>
          {/* Thông tin bên phải */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <h1 style={{
              fontWeight: 900,
              fontSize: 44,
              marginBottom: 18,
              color: darkMode ? "#fff" : "#23244a"
            }}>{movie.title}</h1>
            <div className="mb-3" style={{ fontSize: 20, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 18 }}>
              <span>
                <i className="bi bi-film" /> {movie.genre}
              </span>
              <span>
                <i className="bi bi-clock" /> {movie.duration ? `${movie.duration} phút` : ""}
              </span>
              <span>
                <i className="bi bi-translate" /> {movie.subtitle || "Phụ Đề"}
              </span>
              <span>
                <span style={{
                  background: "#ffe600",
                  color: "#222",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontWeight: 700
                }}>
                  {movie.age ? `T${movie.age}: Phim dành cho khán giả từ đủ ${movie.age} tuổi trở lên` : ""}
                </span>
              </span>
            </div>
            <div className="mb-3" style={{ fontSize: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 6 }}>MÔ TẢ</div>
              <div>
                <span style={{ fontWeight: 500 }}>Đạo diễn:</span> {movie.director}
                <br />
                <span style={{ fontWeight: 500 }}>Khởi chiếu:</span> {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : ''}
              </div>
            </div>
            <div className="mb-4" style={{ fontSize: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 6 }}>NỘI DUNG PHIM</div>
              <div>{movie.content || movie.description || 'Chưa có mô tả.'}</div>
            </div>
            {/* Nút xem trailer */}
            {movie.video && (
              <div className="mb-4">
                <Button
                  variant={darkMode ? "outline-light" : "outline-primary"}
                  style={{
                    fontWeight: 600,
                    fontSize: 20,
                    borderRadius: 30,
                    padding: "10px 36px",
                    background: "transparent",
                    color: darkMode ? "#fff" : "#23244a",
                    border: `2px solid ${borderColor}`
                  }}
                  onClick={() => setShowTrailer(true)}
                >
                  <FaPlayCircle style={{ fontSize: 28, marginRight: 10, color: "#e74c3c" }} />
                  Xem Trailer
                </Button>
              </div>
            )}
            <div className="mt-4 d-flex flex-wrap gap-3">
              <Button
                variant="primary"
                style={{
                  fontSize: 18,
                  padding: "8px 32px",
                  background: darkMode ? "#30336b" : "#3f51b5",
                  border: "none"
                }}
                onClick={() => navigate(`/booking/${movie.movie_id}`)}
              >
                Đặt vé
              </Button>
              <Button
                variant="secondary"
                style={{
                  fontSize: 18,
                  padding: "8px 32px",
                  background: darkMode ? "#636e72" : "#b0bec5",
                  color: darkMode ? "#fff" : "#23244a",
                  border: "none"
                }}
                onClick={() => navigate(-1)}
              >
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Trailer */}
      <Modal
        show={showTrailer}
        onHide={() => setShowTrailer(false)}
        centered
        size="lg"
        contentClassName={darkMode ? "bg-dark" : ""}
      >
        <Modal.Header closeButton closeVariant={darkMode ? "white" : undefined}>
          <Modal.Title>Trailer: {movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: darkMode ? "#181a20" : "#fff" }}>
          <video
            width="100%"
            height="420"
            controls
            autoPlay
            style={{ borderRadius: 10, background: '#000', display: 'block' }}
          >
            <source src={`http://localhost:5000${movie.video}`} type="video/mp4" />
            Trình duyệt không hỗ trợ video.
          </video>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MovieDetailPage;