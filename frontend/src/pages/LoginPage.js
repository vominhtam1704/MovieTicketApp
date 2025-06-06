import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Card, Container, Row, Col } from 'react-bootstrap';

const LoginPage = () => {
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

      // Lưu thông tin vào localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      // Điều hướng theo role
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

      window.location.reload(); // reload để header cập nhật
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng nhập thất bại');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h2 className="mb-4 text-center">Đăng nhập</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">Đăng nhập</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
