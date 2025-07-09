import logo from './georgia-vagim-movie.jpg';
import './App.css';

import MovieCard from './components/MovieCard';

function App() {

  const testMovie = {
    id: 0,
    title: "harry potter",
    description: "wizard boy!!",
    year: 2000,
    watched: false,
    review: ""
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
        <MovieCard 
          movie={testMovie}
          onToggleWatched={handleToggleWatched}
          onDelete={handleDelete} 
        />
      </header>
    </div>
  );
}

export default App;
