import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../georgia-vagim-movie.jpg';
import MovieCard from '../components/MovieCard';

import '../App.css';
import './styles/HomePage.css';



const HomePage = () => {

  const navigate = useNavigate();

  const [showAddForm, setShowAddForm] = useState(false);


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

  const handleAddMovie = () => {
    alert(`added alert`);
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
              placeholder="Title"
            />
            <textarea
              type="text"
              placeholder="Description"
            />
            <input
              type="number"
              placeholder="Release Year"
            />
            <label>Watched?:</label>
            <input
              type="checkbox"
            />
            <textarea
              type="text"
              placeholder="Your Review"
            />
            <button onClick={handleAddMovie}>Submit</button>
          </div>
        )}
        {/* <MovieCard 
          movie={testMovie}
          onToggleWatched={handleToggleWatched}
          onDelete={handleDelete} 
        /> */}
      </header>
    </div>
  );

};


export default HomePage;