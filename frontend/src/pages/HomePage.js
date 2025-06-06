import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        setMovies(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể tải danh sách phim từ máy chủ!');
        setLoading(false);
      });
  }, []);

  // Lọc phim theo tên
  const filteredMovies = movies.filter(movie =>
    movie.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <div className="mb-4 d-flex flex-column align-items-center justify-content-center">
        <h1 className="text-center mb-3" style={{ fontWeight: 700, fontSize: 38, color: "#2d3a4b", letterSpacing: 1 }}>
          Ứng dụng vé xem phim
        </h1>
        {token && role === 'Admin' && (
          <Button variant="success" size="lg" onClick={() => navigate('/admin')}>
            Thêm phim
          </Button>
        )}
      </div>
      <Form className="mb-4 mx-auto" style={{ maxWidth: 500 }}>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm phim theo tên..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Form>
      <h4 className="mb-4 text-center text-secondary">Danh sách phim nổi bật</h4>
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      <Row>
        {filteredMovies.map(movie => (
          <Col md={4} sm={6} xs={12} className="mb-4" key={movie.movie_id}>
            <Card className="h-100 shadow-sm d-flex flex-column">
              <div style={{ width: '100%', height: 220, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Card.Img
                  variant="top"
                  src={
                    movie.image
                      ? `http://localhost:5000${movie.image}`
                      : "https://via.placeholder.com/400x220?text=Movie+Poster"
                  }
                  alt={movie.title}
                  style={{ maxHeight: 220, width: 'auto', objectFit: 'contain' }}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <strong>Thể loại:</strong> {movie.genre}<br />
                  <strong>Đạo diễn:</strong> {movie.director}
                </Card.Text>
                <div className="mt-auto">
                  <Button
                    variant="info"
                    className="me-2 mb-2"
                    onClick={() => navigate(`/movies/${movie.movie_id}`)}
                  >
                    Chi tiết
                  </Button>
                  {token && role === 'Admin' && (
                    <>
                      <Button
                        variant="warning"
                        className="me-2 mb-2"
                        onClick={() => navigate(`/edit-movie/${movie.movie_id}`)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        className="mb-2"
                        onClick={() => navigate(`/admin?delete=${movie.movie_id}`)}
                      >
                        Xóa
                      </Button>
                    </>
                  )}
                </div>
              </Card.Body>
              <Card.Footer className="text-center">
                <small className="text-muted">
                  Khởi chiếu: {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : ''}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      {(!loading && filteredMovies.length === 0) && (
        <Alert variant="info" className="text-center">Không tìm thấy phim nào phù hợp.</Alert>
      )}
    </Container>
  );
};

export default HomePage;