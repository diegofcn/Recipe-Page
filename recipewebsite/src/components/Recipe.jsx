import React from 'react';
import './Recipe.css';

const Recipe = ({ id, title, image, ingredients, category, duration }) => {
  return (
    <div className="recipe">
      <div className="recipe-image">
        <img src={image} alt={title} />
      </div>
      <div className="recipe-info">
      
      <h3 className="recipe-title">{title.toUpperCase()}</h3>
      
      <div className='extras'>
      <p className='recipe-category'>{category}</p>
      <p className='recipe-duration'>{duration}</p>
    </div>
      </div>
    </div>
  );
};

export default Recipe;
