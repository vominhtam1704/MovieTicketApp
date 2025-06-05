import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
  <Card className="mb-4 shadow-sm">
    <Card.Img variant="top" src="https://via.placeholder.com/300x180?text=Movie+Poster" />
    <Card.Body>
      <Card.Title>{movie.title}</Card.Title>
      <Card.Text>
        <strong>Genre:</strong> {movie.genre}<br />
        <strong>Director:</strong> {movie.director}
      </Card.Text>
      <Button as={Link} to={`/movie/${movie.movie_id}`} variant="primary">View Details</Button>
    </Card.Body>
  </Card>
);

export default MovieCard;