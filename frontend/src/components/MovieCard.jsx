import './styles/MovieCard.css';

import React from 'react';

const MovieCard = ({ movie, onToggleWatched, onDelete }) => {
  return (
    <div className="movie-card">
      <h2>{movie.title} ({movie.year})</h2>
      <p><strong>Description:</strong> {movie.description}</p>
      <p>
        <strong>Status:</strong>{' '}
        <span style={{ color: movie.watched ? 'green' : 'red' }}>
          {movie.watched ? 'Watched' : 'Unwatched'}
        </span>
      </p>
      <p><strong>Review:</strong> {movie.review || 'No review yet.'}</p>
      <div>
        <button className="watch-btn" onClick={() => onToggleWatched(movie)}>
          {movie.watched ? 'Mark Unwatched' : 'Mark Watched'}
        </button>
        <button className="delete-btn" onClick={() => onDelete(movie.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};


export default MovieCard;