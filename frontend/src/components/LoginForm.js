import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // Lưu token và role
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      // Điều hướng tùy theo vai trò
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

      // Optional: reload để cập nhật Header
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng nhập thất bại');
    }
  };

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h2 className="mb-4 text-center">Đăng nhập</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
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

          <Button type="submit" variant="primary" className="w-100">Đăng nhập</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
