import React, { useState } from "react";




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
    <form onSubmit={handleSubmit} className="edit-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        placeholder="Release Year"
      />
      <label>
        Watched:
        <input
          type="checkbox"
          checked={watched}
          onChange={(e) => setWatched(e.target.checked)}
        />
      </label>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Your Review"
      />

      <div className="edit-buttons">
        <button type="submit">💾 Save</button>
        <button type="button" onClick={onCancel}>❌ Cancel</button>
      </div>
    </form>
  );
}

export default EditMovieForm;