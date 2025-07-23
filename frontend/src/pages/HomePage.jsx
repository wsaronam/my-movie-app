import { useNavigate } from 'react-router-dom';

import logo from '../georgia-vagim-movie.jpg';
import MovieCard from '../components/MovieCard';

import '../App.css';



const HomePage = () => {

  const navigate = useNavigate();

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
        <MovieCard 
            movie={testMovie}
            onToggleWatched={handleToggleWatched}
            onDelete={handleDelete} 
        />
      </header>
    </div>
  );

};


export default HomePage;