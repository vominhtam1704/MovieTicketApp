import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-page" style={{ maxWidth: 800, margin: "40px auto", background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
      <h1>{movie.title}</h1>
      {movie.image && (
        <img
          src={`http://localhost:5000${movie.image}`}
          alt={movie.title}
          style={{ width: 300, height: 440, objectFit: "cover", borderRadius: 12, marginBottom: 24 }}
        />
      )}
      <p><strong>Thể loại:</strong> {movie.genre}</p>
      <p><strong>Đạo diễn:</strong> {movie.director}</p>
      <p><strong>Thời lượng:</strong> {movie.duration ? `${movie.duration} phút` : ""}</p>
      <p><strong>Phụ đề:</strong> {movie.subtitle}</p>
      <p><strong>Độ tuổi:</strong> {movie.age ? `T${movie.age}` : ""}</p>
      <p><strong>Khởi chiếu:</strong> {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : ""}</p>
      <p><strong>Mô tả:</strong> {movie.description}</p>
      <p><strong>Nội dung phim:</strong> {movie.content}</p>
      {movie.video && (
        <div style={{ margin: "24px 0" }}>
          <video width="100%" height="400" controls style={{ borderRadius: 10, background: "#000" }}>
            <source src={`http://localhost:5000${movie.video}`} type="video/mp4" />
            Trình duyệt không hỗ trợ video.
          </video>
        </div>
      )}
    </div>
  );
};

export default MoviePage;