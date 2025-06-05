// src/pages/TicketPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketPage = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/showtimes') // API lấy danh sách suất chiếu
      .then((response) => {
        setShowtimes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching showtimes:', error);
      });
  }, []);

  const handleShowtimeChange = (e) => {
    const showtimeId = e.target.value;
    setSelectedShowtime(showtimeId);

    // Fetch seats available for selected showtime
    axios
      .get(`http://localhost:5000/api/tickets/${showtimeId}/seats`)
      .then((response) => {
        setSeats(response.data);
      })
      .catch((error) => {
        console.error('Error fetching available seats:', error);
      });
  };

  const handleSeatSelection = (seat) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((s) => s !== seat);
      } else {
        return [...prev, seat];
      }
    });
  };

  const handleBooking = () => {
    if (!selectedShowtime || selectedSeats.length === 0) {
      alert('Please select a showtime and at least one seat.');
      return;
    }

    // Call API to create booking for selected seats
    axios
      .post('http://localhost:5000/api/tickets', {
        showtime_id: selectedShowtime,
        seats: selectedSeats,
      })
      .then((response) => {
        alert('Tickets booked successfully');
      })
      .catch((error) => {
        console.error('Error booking tickets:', error);
      });
  };

  return (
    <div>
      <h1>Book Tickets</h1>
      <div>
        <h2>Select Showtime</h2>
        <select onChange={handleShowtimeChange} value={selectedShowtime}>
          <option value="">Select a showtime</option>
          {showtimes.map((showtime) => (
            <option key={showtime.showtime_id} value={showtime.showtime_id}>
              {showtime.showtime}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2>Select Seats</h2>
        <div className="seats">
          {seats.map((seat) => (
            <button
              key={seat}
              onClick={() => handleSeatSelection(seat)}
              className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
            >
              {seat}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleBooking} className="btn btn-primary">
        Book Tickets
      </button>
    </div>
  );
};

export default TicketPage;
