import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import MovieDetailPage from './pages/MovieDetailPage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import EditMoviePage from './pages/EditMoviePage'; // Thêm dòng này
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/edit-movie/:id" element={<EditMoviePage />} /> {/* Thêm dòng này */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;