import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../georgia-vagim-movie.jpg';
import MovieCard from '../components/MovieCard';

import CollapsibleText from '../components/CollapsibleText';
import EditMovieForm from '../components/EditMovieForm';
import Modal from '../components/Modal';

import '../App.css';
import './styles/HomePage.css';



const HomePage = () => {

  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newReleaseYear, setNewReleaseYear] = useState(1900);
  const [newHasWatched, setNewHasWatched] = useState(false);
  const [newReview, setNewReview] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const [movies, setMovies] = useState([]);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`http://localhost:8080/api/movies/user?username=${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setMovies(data);
        } 
        else {
          console.error("Failed to fetch movies");
        }
      } 
      catch (err) {
        console.error("Error fetching movies", err);
      }
    };

    fetchMovies();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    navigate('/');
  };

  const handleAddMovie = async () => {
    const username = localStorage.getItem("username");
    let tempErrors = {};

    const newMovie = {
      title: newTitle,
      description: newDescription,
      releaseYear: newReleaseYear,
      watched: newHasWatched,
      review: newReview
    };

    // check if there's a title.  Title is required.
    if (!newTitle.trim()) tempErrors.title = "Title is required";
    setErrors(tempErrors);

    // stop if there are errors
    if (Object.keys(tempErrors).length > 0) return;


    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/movies/add", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newMovie),
      });

      if (res.ok) {
        const savedMovie = await res.json();
        console.log("Movie added:", savedMovie);
        setMovies((prevMovies) => [...prevMovies, savedMovie]);
        setNewTitle('');
        setNewDescription('');
        setNewReleaseYear(1900);
        setNewHasWatched(false);
        setNewReview('');
      } 
      else {
        console.error("Failed to add movie");
      }
    } 
    catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (movie) => {
    setEditingMovie(movie); // save which movie we're updating
  };

  const updateMovie = async (movie) => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const response = await fetch(`http://localhost:8080/api/movies/${movie.id}?username=${username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    if (!response.ok) {
      throw new Error("Failed to update movie");
    } 

    return await response.json(); // backend should return updated movie
  };

  const handleUpdateMovie = async (updatedMovie) => {
    const savedMovie = await updateMovie(updatedMovie);
    setMovies(movies.map(m => (m.id === savedMovie.id ? savedMovie : m)));
    setEditingMovie(null); // resets the movie - no more movie being editted
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Movie App
        </p>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Movie'}
        </button>
        {showAddForm && (
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
            <label>Watched?:</label>
            <input
              type="checkbox"
              checked={newHasWatched}
              onChange={(e) => setNewHasWatched(e.target.checked)}
            />
            <textarea
              type="text"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Your Review"
            />
            <button onClick={handleAddMovie}>Submit</button>
          </div>
        )}
        <div className="movies-container">
          <div className="movie-list">
            {/* {movies.map(movie => (
              <div key={movie.id} className="movie-card">
                {editingMovie?.id === movie.id ? (
                  <EditMovieForm
                    movie={movie}
                    onSave={handleUpdateMovie}
                    onCancel={() => setEditingMovie(null)}
                  />
                ) : (
                  <>
                    <h3>{movie.title}</h3>
                    <CollapsibleText text={movie.description} maxLength={120} />
                    <p><strong>Release Year:</strong> {movie.releaseYear}</p>
                    <p><strong>Status:</strong> {movie.watched ? "✅ Watched" : "❌ Not Watched"}</p>
                    <CollapsibleText text={movie.review} maxLength={120} />
                    <button onClick={() => handleEditClick(movie)}>✏️ Edit</button>
                  </>
                )}
              </div>
            ))} */}
            {movies.map(movie => (
              <div key={movie.id} className="movie-card">
                <h3>{movie.title}</h3>
                <CollapsibleText text={movie.description} maxLength={120} />
                <p><strong>Release Year:</strong> {movie.releaseYear}</p>
                <p><strong>Status:</strong> {movie.watched ? "✅ Watched" : "❌ Not Watched"}</p>
                <CollapsibleText text={movie.review} maxLength={120} />
                <button onClick={() => handleEditClick(movie)}>✏️ Edit</button>
              </div>
            ))}

            <Modal isOpen={!!editingMovie} onClose={() => setEditingMovie(null)}>
              {editingMovie && (
                <EditMovieForm
                  movie={editingMovie}
                  onSave={handleUpdateMovie}
                  onCancel={() => setEditingMovie(null)}
                />
              )}
            </Modal>
            
          </div>
        </div>
        
      </header>
    </div>
  );

};


export default HomePage;