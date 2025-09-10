import React from "react";
import "./styles/AddMovieForm.css";




const AddMovieForm = ({
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  newReleaseYear,
  setNewReleaseYear,
  newHasWatched,
  setNewHasWatched,
  newReview,
  setNewReview,
  errors,
  onSubmit
}) => {
  return (
    <div className="movie-form">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Title"
      />
      {errors.title && <p className="error">{errors.title}</p>}

      <textarea
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Description"
      />

      <input
        type="number"
        value={newReleaseYear}
        onChange={(e) => setNewReleaseYear(e.target.value)}
        placeholder="Release Year"
      />

      <label>
        Watched?{" "}
        <input
          type="checkbox"
          checked={newHasWatched}
          onChange={(e) => setNewHasWatched(e.target.checked)}
        />
      </label>

      <textarea
        type="text"
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        placeholder="Your Review"
      />

      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};


export default AddMovieForm;