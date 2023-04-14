// EditRecipe.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditRecipe.css';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('')

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`);
        setTitle(response.data.title);
        setImage(response.data.image);
        setIngredients(response.data.ingredients.join('\n'));
        setInstructions(response.data.instructions);
        setCategory(response.data.category);
        setDuration(response.data.duration);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedRecipe = {
        title,
        image,
        ingredients: ingredients.split('\n').filter(ingredient => ingredient.trim() !== ''),
        instructions,
        category,
        duration,
      };

      await axios.put(`http://localhost:3001/recipes/${id}`, updatedRecipe);
      navigate(`/recipe/${id}`);
    } catch (error) {
      alert('Failed to update recipe. Please try again.');
    }
  };

  return (
    <div>
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="edit-recipe-form">
        <label className="edit-recipe-label">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="edit-recipe-input"
        />

        <label className="edit-recipe-label">Image URL:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="edit-recipe-input"
        />

        <label className="edit-recipe-label">Ingredients:</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          className="edit-recipe-textarea"
        />

        <label className="edit-recipe-label">Instructions:</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
          className="edit-recipe-textarea"
        />

        <label className="edit-recipe-label">Category:</label>
        <select
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="edit-recipe-input"
        >
          <option value="lunch">lunch</option>
          <option value="breakfast">breakfast</option>
          <option value="dinner">dinner</option>
          <option value="dessert">dessert</option>
          </select>

        <label className="edit-recipe-label">Duration:</label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="edit-recipe-input"
        />
        <button type="submit" className="edit-recipe-button">
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
