import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const AppNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
    window.location.reload();
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Ứng dụng vé xem phim</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
            {!token && (
              <>
                <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
                <Nav.Link as={Link} to="/register">Đăng ký</Nav.Link>
              </>
            )}
            {token && role === 'Admin' && (
              <Nav.Link as={Link} to="/admin">Quản trị viên</Nav.Link>
            )}
            {token && (
              <Button variant="danger" className="ms-2" onClick={handleLogout}>Đăng xuất</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;