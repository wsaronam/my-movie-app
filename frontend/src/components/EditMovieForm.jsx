import React, { useState } from "react";

import "./styles/EditMovieForm.css"




function EditMovieForm({ movie, onSave, onCancel }) {
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [releaseYear, setReleaseYear] = useState(movie.releaseYear);
  const [watched, setWatched] = useState(movie.watched);
  const [review, setReview] = useState(movie.review);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...movie,
      title,
      description,
      releaseYear,
      watched,
      review,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-movie-form">
      <h3>Edit Movie</h3>

      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="Title"
          required
        />
      </label>
      
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="Description"
        />
      </label>
      
      <label>
        Release Year:
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          name="Release Year"
        />
      </label>
      
      <label className="checkbox-label">
        Watched:
        <input
          type="checkbox"
          checked={watched}
          onChange={(e) => setWatched(e.target.checked)}
          name="watched"
        />
      </label>

      <label>
        Review:
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          name="review"
        />
      </label>
      

      <div className="edit-buttons">
        <button type="submit" className="save-btn">💾 Save</button>
        <button type="button" onClick={onCancel} className="cancel-btn">❌ Cancel</button>
      </div>
    </form>
  );
}

export default EditMovieForm;