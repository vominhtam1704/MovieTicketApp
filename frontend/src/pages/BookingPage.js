import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const seatLayout = {
  A: 18, B: 20, C: 24, D: 24, E: 24, F: 24, G: 24,
  H: 24, J: 24, K: 24,
  L: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
};
const rowLabels = Object.keys(seatLayout);

const BookingPage = () => {
  const { id } = useParams(); // showtime_id
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]); // Ghế đã đặt
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getSeats = () => {
    const seats = [];
    rowLabels.forEach(row => {
      if (row === 'L') {
        let seatNum = 1;
        for (let i = 0; i < seatLayout[row].length; i++) {
          seats.push({
            label: `${row}${seatNum}/${row}${seatNum + 1}`,
            type: 'double',
            row,
            key: `${row}${seatNum}`
          });
          seatNum += 2;
        }
      } else {
        for (let i = 1; i <= seatLayout[row]; i++) {
          seats.push({
            label: `${row}${i}`,
            type: 'single',
            row,
            key: `${row}${i}`
          });
        }
      }
    });
    return seats;
  };

  const seats = getSeats();
  const seatRows = {};
  seats.forEach(seat => {
    if (!seatRows[seat.row]) seatRows[seat.row] = [];
    seatRows[seat.row].push(seat);
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tickets/booked/${id}`)
      .then(res => {
        const booked = res.data.map(t => `${t.seat_row}${t.seat_column}`);
        setBookedSeats(booked);
        setLoading(false);
      })
      .catch(() => {
        setError('Lỗi tải ghế đã đặt.');
        setLoading(false);
      });
  }, [id]);

  const toggleSeat = seat => {
    setError('');
    if (bookedSeats.includes(seat.label)) return;
    if (selectedSeats.includes(seat.label)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat.label));
    } else {
      setSelectedSeats([...selectedSeats, seat.label]);
    }
  };

  const total = selectedSeats.reduce((sum, label) => {
    return sum + (label.includes('/') ? 150000 : 55000);
  }, 0);

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      setError('Vui lòng chọn ít nhất 1 ghế.');
      return;
    }

    const token = localStorage.getItem('token');
    const customer_id = localStorage.getItem('user_id'); // đã lưu khi login
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      for (let seatLabel of selectedSeats) {
        if (seatLabel.includes('/')) {
          const [seat1, seat2] = seatLabel.split('/');
          const row = seat1[0];
          const col1 = parseInt(seat1.slice(1));
          const col2 = parseInt(seat2.slice(1));
          await axios.post('http://localhost:5000/api/tickets', {
            showtime_id: id,
            customer_id,
            seat_row: row,
            seat_column: col1,
            price: 75000,
            status: 'Booked'
          }, config);
          await axios.post('http://localhost:5000/api/tickets', {
            showtime_id: id,
            customer_id,
            seat_row: row,
            seat_column: col2,
            price: 75000,
            status: 'Booked'
          }, config);
        } else {
          const row = seatLabel[0];
          const col = parseInt(seatLabel.slice(1));
          await axios.post('http://localhost:5000/api/tickets', {
            showtime_id: id,
            customer_id,
            seat_row: row,
            seat_column: col,
            price: 55000,
            status: 'Booked'
          }, config);
        }
      }

      alert('✅ Đặt vé thành công!');
      navigate('/payment-confirm');
    } catch (err) {
      setError('❌ Không thể đặt vé. Có thể ghế đã được đặt.');
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-3">🎟️ Chọn chỗ ngồi</h2>
      {rowLabels.map(row => (
        <div key={row} className="d-flex align-items-center justify-content-center mb-2">
          <span style={{ width: 20, marginRight: 8, fontWeight: 600 }}>{row}</span>
          {seatRows[row].map(seat => (
            <Button
              key={seat.label}
              variant={
                bookedSeats.includes(seat.label) ? 'secondary'
                  : selectedSeats.includes(seat.label) ? (seat.type === 'double' ? 'warning' : 'success')
                  : (seat.type === 'double' ? 'outline-warning' : 'outline-light')
              }
              disabled={bookedSeats.includes(seat.label)}
              onClick={() => toggleSeat(seat)}
              style={{
                width: seat.type === 'double' ? 80 : 36,
                height: 36,
                fontSize: 12,
                marginRight: 6
              }}
            >
              {seat.label}
            </Button>
          ))}
        </div>
      ))}

      {error && <Alert variant="danger" className="text-center mt-3">{error}</Alert>}

      <div className="text-center mt-4">
        <strong>Ghế đã chọn:</strong> {selectedSeats.join(', ') || 'Chưa chọn'}
        <br />
        <strong>Tổng tiền:</strong> {total.toLocaleString('vi-VN')} VND
      </div>

      <div className="text-center mt-4">
        <Button variant="primary" onClick={handleBooking}>Tiếp tục thanh toán</Button>
      </div>
    </Container>
  );
};

export default BookingPage;
