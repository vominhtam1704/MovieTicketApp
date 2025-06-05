// src/pages/MoviePage.js
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
    <div className="movie-page">
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Genre: {movie.genre}</p>
      <p>Director: {movie.director}</p>
      <p>Main Actor: {movie.main_actor}</p>
      <p>Language: {movie.language}</p>
      <p>Country: {movie.country}</p>
      <p>Release Date: {movie.release_date}</p>
    </div>
  );
};

export default MoviePage;
