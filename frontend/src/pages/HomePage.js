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
        setMovies(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể tải danh sách phim từ máy chủ!');
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phim này?')) return;
    fetch(`http://localhost:5000/api/movies/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || 'Đã xóa');
        setMovies(movies.filter(m => m.movie_id !== id));
      })
      .catch(err => alert('Lỗi khi xóa phim'));
  };

  const filteredMovies = movies.filter(movie =>
    movie.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-3 text-primary">🎬 Ứng dụng vé xem phim</h1>

      {token && role === 'Admin' && (
        <div className="text-center mb-3">
          <Button variant="success" onClick={() => navigate('/admin')}>Thêm phim</Button>
        </div>
      )}

      <Form className="mb-4 mx-auto" style={{ maxWidth: 500 }}>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm phim theo tên..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Form>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {filteredMovies.map(movie => (
            <Col md={4} className="mb-4" key={movie.movie_id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={movie.image ? `http://localhost:5000${movie.image}` : 'https://via.placeholder.com/400x220?text=Movie+Poster'}
                  style={{ height: 220, objectFit: 'cover' }}
                />
                <Card.Body>
  <Card.Title>{movie.title}</Card.Title>
  <Card.Text>
    <strong>Thể loại:</strong> {movie.genre}<br />
    <strong>Đạo diễn:</strong> {movie.director}
  </Card.Text>
  <Card.Text>
    <strong>Khởi chiếu:</strong> {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'Chưa rõ'}
  </Card.Text>
  <Button variant="info" onClick={() => navigate(`/movies/${movie.movie_id}`)} className="me-2">Chi tiết</Button>
  {token && role === 'Admin' && (
    <>
      <Button variant="warning" onClick={() => navigate(`/edit-movie/${movie.movie_id}`)} className="me-2">Sửa</Button>
      <Button variant="danger" onClick={() => handleDelete(movie.movie_id)}>Xóa</Button>
    </>
  )}
</Card.Body>

              </Card>
            </Col>
          ))}
        </Row>
      )}
      {!loading && filteredMovies.length === 0 && (
        <Alert variant="info" className="text-center">Không tìm thấy phim nào.</Alert>
      )}
    </Container>
  );
};

export default HomePage;
