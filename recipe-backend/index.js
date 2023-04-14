const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://brandon:juUuZtKiC8TNhqz0@cluster0.kcezu21.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const recipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    ingredients: [String],
    instructions: String,
    category: String,
    duration: String,
});
  
const Recipe = mongoose.model('Recipe', recipeSchema);

// Routes

// GET all recipes
app.get('/recipes', async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
// POST a new recipe
app.post('/recipes', async (req, res) => {
    const recipe = new Recipe(req.body);
  
    try {
      const newRecipe = await recipe.save();
      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// GET a single recipe by ID
app.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Update a recipe by ID
app.put('/recipes/:id', async (req, res) => {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      res.json(updatedRecipe);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
