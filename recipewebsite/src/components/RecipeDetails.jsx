import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const steps = recipe.instructions.split('\n').filter(step => step.trim() !== '');

  return (
    <div>
      <div className='hero'>
      <div className='container'>
      <div className='image-container'>
        <img className='image-con' src={recipe.image} alt="" />
      </div>
      </div>
      <h1 className='title'>{recipe.title.toUpperCase()}</h1>
      <hr className='divider'/>
      </div>
      
      <div className="recipe-details-container">
      <div className="ingredients-container">
        <h2>Ingredients</h2>
        <ul>
          {Array.isArray(recipe.ingredients) && recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="instructions-container">
        <h2>Instructions</h2>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
    <div className='btn-container'>
      <Link to={`/recipe/${recipe._id}/edit`}>
        <button>Edit Recipe</button>
      </Link>
    </div>
    </div>
  );
};

export default RecipeDetails;
