import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Theo dõi route để cập nhật trạng thái đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setRole(storedRole?.toLowerCase() || null); // dùng toLowerCase để tránh phân biệt chữ hoa
    console.log("Header reloaded - role:", storedRole);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Movie Ticket App</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}

            {isLoggedIn && role === 'admin' && (
              <Nav.Link as={Link} to="/admin">Quản lý</Nav.Link>
            )}

            {isLoggedIn && (
              <Button variant="danger" size="sm" onClick={handleLogout}>Logout</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
