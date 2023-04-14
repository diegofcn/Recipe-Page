import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">RecipeApp</div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="/" className="navbar-link">Home</a>
          </li>
          <li className="navbar-item">
            <a href="/recipes" className="navbar-link">Recipes</a>
          </li>
          <li className="navbar-item">
          <Link className='navbar-link' to="/add-recipe">Add Recipe</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
