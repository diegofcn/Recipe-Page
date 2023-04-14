import React, { useState } from 'react';
import axios from 'axios';
import './AddRecipe.css';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
const [category, setCategory] = useState('');
const [duration, setDuration] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ingredientsArray = ingredients.split('\n').map((ingredient) => ingredient.trim());

    try {
      await axios.post('http://localhost:3001/recipes', {
        title,
        image,
        ingredients: ingredientsArray,
        instructions,
        category,
        duration,
      });
      alert('Recipe added successfully!');
      setTitle('');
      setImage('');
      setIngredients('');
      setInstructions('');
      setCategory('');
      setDuration('');
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Failed to add recipe. Please try again.');
    }
  };

  return (
    <div className="AddRecipe">
      <h2>Add a new recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label htmlFor="ingredients">Ingredients (one per line):</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        ></textarea>

        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        ></textarea>

        <label htmlFor="category">Category:</label>
        <select
        name='category'
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="lunch">lunch</option>
          <option value="breakfast">breakfast</option>
          <option value="dinner">dinner</option>
          <option value="dessert">dessert</option>
        </select>

        <label htmlFor="duration">Duration:</label>
        <input
          type="text"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
