import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Giá trị mặc định
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    axios.post('http://localhost:5000/api/auth/register', { username, email, password, role })
      .then(() => {
        setSuccess('Đăng ký thành công! Đang chuyển hướng...');
        setTimeout(() => navigate('/login'), 1500);
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'Đăng ký thất bại');
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ minWidth: 400 }} className="shadow">
        <Card.Body>
          <h2 className="mb-4 text-center">Đăng ký</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder="Nhập tên đăng nhập"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Nhập email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Nhập mật khẩu"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vai trò</Form.Label>
              <Form.Select value={role} onChange={e => setRole(e.target.value)} required>
                <option value="User">Khách hàng</option>
                <option value="Admin">Quản trị viên</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Đăng ký</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterForm;