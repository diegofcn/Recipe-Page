// Category.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Recipe from './Recipe';
import './Category.css';

const Category = ({ category }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes`);
        const filteredRecipes = response.data.filter(
          (recipe) => recipe.category === category
        );
        console.log('Filtered Recipes:', filteredRecipes);
        setRecipes(filteredRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [category]);

  return (
    <div className="category-container">
      <h2 className='head'>{category}</h2>
      <div className="category-recipes">
        {recipes.map((recipe) => (
            <Link className='recipe-info' key={recipe._id} to={`/recipe/${recipe._id}`}>
          <Recipe key={recipe._id} recipe={recipe} 
          title={recipe.title}
            image={recipe.image}
            ingredients={recipe.ingredients}
            category={recipe.category}
            duration={recipe.duration} />
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
