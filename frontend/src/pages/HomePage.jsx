import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../georgia-vagim-movie.jpg';

import MovieCard from '../components/MovieCard';
import AddMovieForm from '../components/AddMovieForm';
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

  const deleteMovie = async (id) => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const response = await fetch(`http://localhost:8080/api/movies/${id}?username=${username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }

    setMovies(movies.filter((m) => m.id !== id));
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Movie App
        </p>
        <button className="logout-button" 
                onClick={() => {
                  if (window.confirm("Are you sure you want to log out?")) {
                    handleLogout();
                  }
                }}
        >
          Logout
        </button>
        <button className="add-movie-button" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Movie'}
        </button>
        {showAddForm && (
          <AddMovieForm
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newDescription={newDescription}
            setNewDescription={setNewDescription}
            newReleaseYear={newReleaseYear}
            setNewReleaseYear={setNewReleaseYear}
            newHasWatched={newHasWatched}
            setNewHasWatched={setNewHasWatched}
            newReview={newReview}
            setNewReview={setNewReview}
            errors={errors}
            onSubmit={handleAddMovie}
          />
        )}
        <div className="movies-container">
          <div className="movie-list">
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onEdit={handleEditClick}
                onDelete={deleteMovie}
              />
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