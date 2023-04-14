import React from 'react';
import { Link } from "react-router-dom"
import Recipe from './Recipe';
import './RecipeList.css';

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe, index) => (
        <Link className='recipe-info' key={recipe._id} to={`/recipe/${recipe._id}`}>
          <Recipe className="recipe-info"
            key={index}
            title={recipe.title}
            image={recipe.image}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
          />
          </Link>
      ))}
    </div>
  );
};

export default RecipeList;
