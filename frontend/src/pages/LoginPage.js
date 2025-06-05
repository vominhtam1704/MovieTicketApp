import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    axios.post('http://localhost:5000/api/auth/login', { email, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role); // Đảm bảo backend trả về role
        navigate('/');
        window.location.reload();
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Đăng nhập thất bại');
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Đăng nhập</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Đăng nhập</button>
    </form>
  );
};

export default LoginPage;