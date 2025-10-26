const express = require('express');
const router = express.Router();
const RecipeClass = require('../classes/Recipe');
const { authenticate } = require('../middleware/auth');

// Get all recipes (with optional filters)
router.get('/', async (req, res) => {
  try {
    const recipes = await RecipeClass.getAllRecipes(req.query);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await RecipeClass.getRecipeById(req.params.id);
    const fullDetails = await recipe.getFullDetails();
    res.json(fullDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Create a new recipe (protected)
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      cuisine,
      prepTime,
      cookTime,
      servings,
      difficulty
    } = req.body;

    // Validate required fields
    if (!title || !description || !ingredients || !instructions) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const recipe = await RecipeClass.createRecipe({
      title,
      description,
      ingredients,
      instructions,
      cuisine: cuisine || 'Other',
      prepTime,
      cookTime,
      servings,
      difficulty: difficulty || 'Easy'
    }, req.user._id);

    const fullDetails = await recipe.getFullDetails();
    res.status(201).json({
      message: 'Recipe created successfully',
      recipe: fullDetails
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a recipe (protected - author only)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const isAuthor = await RecipeClass.isAuthor(req.params.id, req.user._id);
    
    if (!isAuthor) {
      return res.status(403).json({ message: 'You are not authorized to update this recipe' });
    }

    const recipe = await RecipeClass.getRecipeById(req.params.id);
    const updatedRecipe = await recipe.updateRecipe(req.body);
    
    res.json({
      message: 'Recipe updated successfully',
      recipe: updatedRecipe
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a recipe (protected - author only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const isAuthor = await RecipeClass.isAuthor(req.params.id, req.user._id);
    
    if (!isAuthor) {
      return res.status(403).json({ message: 'You are not authorized to delete this recipe' });
    }

    const recipe = await RecipeClass.getRecipeById(req.params.id);
    await recipe.deleteRecipe();
    
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like/Unlike a recipe (protected)
router.post('/:id/like', authenticate, async (req, res) => {
  try {
    const recipe = await RecipeClass.getRecipeById(req.params.id);
    const result = await recipe.toggleLike(req.user._id);
    
    res.json({
      message: result.isLiked ? 'Recipe liked' : 'Recipe unliked',
      isLiked: result.isLiked,
      likesCount: result.likesCount
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
