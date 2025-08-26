import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../georgia-vagim-movie.jpg';
import MovieCard from '../components/MovieCard';

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

  const [movies, setMovies] = useState([]);


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


  const testMovie = {
    id: 0,
    title: "harry potter",
    description: "wizard boy!!",
    year: 2000,
    watched: false,
    review: ""
  };

  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    navigate('/');
  };

  const handleAddMovie = async () => {
    const username = localStorage.getItem("username");

    const newMovie = {
      title: newTitle,
      description: newDescription,
      releaseYear: newReleaseYear,
      watched: newHasWatched,
      review: newReview
    };

    try {
      const token = localStorage.getItem("token");
      //const res = await fetch(`http://localhost:8080/api/movies/add?username=${username}`, {
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

  const handleToggleWatched = (movie) => {
    alert(`watched alert`);
  };

  const handleDelete = (id) => {
    alert(`deleted alert`);
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
              value={newHasWatched}
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
        <div className="movie-list">
          <ul>
            {movies.map(movie => (
              <li key={movie.id} className="movie-card">
                <h3>{movie.title}</h3>
                <p className="description">{movie.description}</p>
                <p><strong>Release Year:</strong> {movie.releaseYear}</p>
                <p><strong>Status:</strong> {movie.watched ? "✅ Watched" : "❌ Not Watched"}</p>
                <p className="review">💬 {movie.review}</p>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );

};


export default HomePage;