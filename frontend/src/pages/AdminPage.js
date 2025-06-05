import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Table, Button, Modal, Form, Alert, Row, Col
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/movies';

const AdminPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [form, setForm] = useState({
    title: '',
    genre: '',
    director: '',
    release_date: '',
    image: null,
    video: null
  });
  const [alert, setAlert] = useState({ type: '', message: '' });

  // Chặn user thường truy cập trang admin
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'Admin') {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    axios.get(API_URL)
      .then(res => setMovies(res.data))
      .catch(() => setAlert({ type: 'danger', message: 'Không thể tải danh sách phim!' }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const openModal = (movie = null) => {
    setEditingMovie(movie);
    setForm(movie ? {
      ...movie,
      image: null, // reset file input
      video: null
    } : {
      title: '', genre: '', director: '', release_date: '', image: null, video: null
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('genre', form.genre);
    formData.append('director', form.director);
    formData.append('release_date', form.release_date);
    if (form.image) formData.append('image', form.image);
    if (form.video) formData.append('video', form.video);

    if (editingMovie) {
      // Update
      axios.put(`${API_URL}/${editingMovie.movie_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(() => {
          setAlert({ type: 'success', message: 'Cập nhật phim thành công!' });
          setShowModal(false);
          fetchMovies();
        })
        .catch(() => setAlert({ type: 'danger', message: 'Cập nhật thất bại!' }));
    } else {
      // Add
      axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(() => {
          setAlert({ type: 'success', message: 'Thêm phim thành công!' });
          setShowModal(false);
          fetchMovies();
        })
        .catch(() => setAlert({ type: 'danger', message: 'Thêm phim thất bại!' }));
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Bạn chắc chắn muốn xóa phim này?')) {
      axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          setAlert({ type: 'success', message: 'Xóa phim thành công!' });
          fetchMovies();
        })
        .catch(() => setAlert({ type: 'danger', message: 'Xóa phim thất bại!' }));
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Bảng điều khiển quản trị</h2>
      {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Phim</h4>
        <Button variant="primary" onClick={() => openModal()}>Thêm phim</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Thể loại</th>
            <th>Đạo diễn</th>
            <th>Khởi chiếu</th>
            <th>Ảnh</th>
            <th>Video</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.movie_id}>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.director}</td>
              <td>{movie.release_date}</td>
              <td>
                {movie.image
                  ? <img src={`http://localhost:5000${movie.image}`} alt="" width={60} />
                  : <span className="text-muted">Chưa có</span>}
              </td>
              <td>
                {movie.video
                  ? <a href={`http://localhost:5000${movie.video}`} target="_blank" rel="noopener noreferrer">Xem video</a>
                  : <span className="text-muted">Chưa có</span>}
              </td>
              <td>
                <Button size="sm" variant="warning" className="me-2" onClick={() => openModal(movie)}>Sửa</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(movie.movie_id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal thêm/sửa phim */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingMovie ? 'Sửa phim' : 'Thêm phim'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thể loại</Form.Label>
              <Form.Control
                name="genre"
                value={form.genre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Đạo diễn</Form.Label>
              <Form.Control
                name="director"
                value={form.director}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Khởi chiếu</Form.Label>
              <Form.Control
                type="date"
                name="release_date"
                value={form.release_date ? form.release_date.slice(0, 10) : ''}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Ảnh (upload)</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Video (upload)</Form.Label>
                  <Form.Control
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary">
              {editingMovie ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminPage;