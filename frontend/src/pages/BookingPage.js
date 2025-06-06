import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';

// Số ghế từng hàng theo ảnh, chỉ hàng L là ghế đôi (13 cặp = 26 ghế)
const seatLayout = {
  A: 18,
  B: 20,
  C: 24,
  D: 24,
  E: 24,
  F: 24,
  G: 24,
  H: 24,
  J: 24,
  K: 24,
  L: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2] // 13 cặp ghế đôi
};

const rowLabels = Object.keys(seatLayout);

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState('');

  // Tạo danh sách ghế cho từng hàng
  const getSeats = () => {
    const seats = [];
    rowLabels.forEach(row => {
      if (row === 'L') {
        // Ghế đôi ở hàng L
        let seatNum = 1;
        for (let i = 0; i < seatLayout[row].length; i++) {
          seats.push({
            label: `${row}${seatNum}/${row}${seatNum + 1}`,
            type: 'double',
            row,
            key: `${row}${seatNum}`,
          });
          seatNum += 2;
        }
      } else {
        // Ghế đơn các hàng còn lại
        for (let i = 1; i <= seatLayout[row]; i++) {
          seats.push({
            label: `${row}${i}`,
            type: 'single',
            row,
            key: `${row}${i}`,
          });
        }
      }
    });
    return seats;
  };

  const seats = getSeats();

  // Gom ghế theo hàng để hiển thị
  const seatRows = {};
  seats.forEach(seat => {
    if (!seatRows[seat.row]) seatRows[seat.row] = [];
    seatRows[seat.row].push(seat);
  });

  // Tính tổng tiền
  const total = selectedSeats.reduce((sum, seatLabel) => {
    if (seatLabel.includes('/')) {
      return sum + 150000;
    }
    return sum + 55000;
  }, 0);

  const toggleSeat = (seat) => {
    setError('');
    if (seat.type === 'double') {
      if (selectedSeats.includes(seat.label)) {
        setSelectedSeats(selectedSeats.filter(s => s !== seat.label));
      } else {
        setSelectedSeats([...selectedSeats, seat.label]);
      }
    } else {
      setSelectedSeats((prev) =>
        prev.includes(seat.label)
          ? prev.filter((s) => s !== seat.label)
          : [...prev, seat.label]
      );
    }
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      setError('Vui lòng chọn ít nhất 1 ghế!');
      return;
    }
    navigate(`/payment/${id}`, { state: { seats: selectedSeats } });
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-center">
        <h2 className="mb-4 text-center">Chọn chỗ ngồi cho phim</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#222', padding: 20, borderRadius: 8, minWidth: 900 }}>
          <div className="text-center mb-2" style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Màn hình</div>
          <div style={{ marginBottom: 20, color: '#fff', textAlign: 'center' }}>Khu vực xem tốt nhất</div>
          <div>
            {rowLabels.map(row => (
              <div key={row} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <span style={{ width: 20, color: '#fff', fontWeight: 'bold', marginRight: 8 }}>{row}</span>
                {seatRows[row].map((seat, idx) => (
                  <Button
                    key={seat.key}
                    variant={
                      selectedSeats.includes(seat.label)
                        ? (seat.type === 'double' ? 'warning' : 'success')
                        : (seat.type === 'double' ? 'outline-warning' : 'outline-light')
                    }
                    style={{
                      width: seat.type === 'double' ? 80 : 36,
                      height: 36,
                      padding: 0,
                      marginRight: 6,
                      marginLeft: 0,
                      fontSize: 13,
                    }}
                    onClick={() => toggleSeat(seat)}
                  >
                    {seat.type === 'double' ? '👬 ' : ''}
                    {seat.label}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {error && <Alert variant="danger" className="mt-3 text-center">{error}</Alert>}
      <div className="mt-3 text-center">
        <strong>Ghế đã chọn:</strong> {selectedSeats.join(', ') || 'Chưa chọn'}
        <br />
        <strong>Tổng tiền:</strong> {total.toLocaleString('vi-VN')} VND
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <span>
          <Button variant="success" size="sm" disabled style={{ marginRight: 5 }} /> Ghế đơn đã chọn
        </span>
        <span className="ms-3">
          <Button variant="warning" size="sm" disabled style={{ marginRight: 5 }} /> Ghế đôi đã chọn
        </span>
        <span className="ms-3">
          <Button variant="outline-light" size="sm" disabled style={{ marginRight: 5, background: '#222' }} /> Ghế đơn trống
        </span>
        <span className="ms-3">
          <Button variant="outline-warning" size="sm" disabled style={{ marginRight: 5, background: '#222' }} /> Ghế đôi trống
        </span>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Button variant="primary" className="me-3" onClick={handleBooking}>
          Tiếp tục thanh toán
        </Button>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </div>
    </Container>
  );
};

export default BookingPage;