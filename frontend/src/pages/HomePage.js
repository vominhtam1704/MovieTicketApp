import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể tải danh sách phim từ máy chủ!');
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">🎬 Ứng dụng vé xem phim</h1>
      <h4 className="mb-4 text-center text-secondary">Danh sách phim nổi bật</h4>
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      <Row>
        {movies.map(movie => (
          <Col md={4} sm={6} xs={12} className="mb-4" key={movie.movie_id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/400x220?text=Movie+Poster"
                alt={movie.title}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <strong>Thể loại:</strong> {movie.genre}<br />
                  <strong>Đạo diễn:</strong> {movie.director}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                <small className="text-muted">Khởi chiếu: {movie.release_date}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      {(!loading && movies.length === 0) && (
        <Alert variant="info" className="text-center">Chưa có phim nào trong hệ thống.</Alert>
      )}
    </Container>
  );
};

export default HomePage;