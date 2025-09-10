import CollapsibleText from "./CollapsibleText";

import './styles/MovieCard.css';




const MovieCard = ({ movie, onEdit, onDelete }) => {

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${movie.title}"?`
    );
    if (confirmDelete) {
      onDelete(movie.id);
    }
  };

  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <CollapsibleText text={movie.description} maxLength={120} />
      <p><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p><strong>Status:</strong> {movie.watched ? "✅ Watched" : "❌ Not Watched"}</p>
      <CollapsibleText text={movie.review} maxLength={120} />
      <div className="card-buttons">
        <button onClick={() => onEdit(movie)}>✏️ Edit</button>
        <button onClick={handleDeleteClick} className="delete-btn">🗑 Delete</button>
      </div>
    </div>
  );
};


export default MovieCard;