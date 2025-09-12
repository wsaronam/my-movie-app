import React from 'react';
import logo from '../georgia-vagim-movie.jpg'; 
import "../App.css";;




const Header = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>My Movie App</p>
      </header>
    </div>
    
  );
};

export default Header;