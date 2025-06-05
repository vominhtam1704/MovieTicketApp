import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard';

const MovieCardList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then((response) => setMovies(response.data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  return (
    <Row>
      {movies.map((movie) => (
        <Col md={4} key={movie.movie_id}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
};

export default MovieCardList;