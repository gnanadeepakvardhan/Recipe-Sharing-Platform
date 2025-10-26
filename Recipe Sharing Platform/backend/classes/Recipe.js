const Recipe = require('../models/Recipe');

class RecipeClass {
  constructor(recipe) {
    this.recipe = recipe;
  }

  // Get sanitized recipe data
  toPublicJSON() {
    return {
      _id: this.recipe._id,
      title: this.recipe.title,
      description: this.recipe.description,
      ingredients: this.recipe.ingredients,
      instructions: this.recipe.instructions,
      cuisine: this.recipe.cuisine,
      prepTime: this.recipe.prepTime,
      cookTime: this.recipe.cookTime,
      servings: this.recipe.servings,
      difficulty: this.recipe.difficulty,
      author: this.recipe.author,
      likes: this.recipe.likes,
      createdAt: this.recipe.createdAt,
      updatedAt: this.recipe.updatedAt
    };
  }

  // Get formatted recipe with author details
  async getFullDetails() {
    await this.recipe.populate('author', 'username email');
    return {
      ...this.toPublicJSON(),
      author: {
        _id: this.recipe.author._id,
        username: this.recipe.author.username,
        email: this.recipe.author.email
      }
    };
  }

  // Static method to create a new recipe
  static async createRecipe(recipeData, authorId) {
    const recipe = await Recipe.create({
      ...recipeData,
      author: authorId
    });
    return new RecipeClass(recipe);
  }

  // Static method to get all recipes with optional filters
  static async getAllRecipes(filters = {}) {
    const query = {};
    
    // Filter by cuisine
    if (filters.cuisine) {
      query.cuisine = filters.cuisine;
    }
    
    // Filter by difficulty
    if (filters.difficulty) {
      query.difficulty = filters.difficulty;
    }
    
    // Search by text
    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    // Filter by author
    if (filters.authorId) {
      query.author = filters.authorId;
    }

    const recipes = await Recipe.find(query)
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    return recipes.map(recipe => ({
      _id: recipe._id,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      cuisine: recipe.cuisine,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      author: recipe.author,
      likes: recipe.likes,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt
    }));
  }

  // Static method to get a single recipe by ID
  static async getRecipeById(recipeId) {
    const recipe = await Recipe.findById(recipeId).populate('author', 'username email');
    
    if (!recipe) {
      throw new Error('Recipe not found');
    }

    return new RecipeClass(recipe);
  }

  // Instance method to update recipe
  async updateRecipe(updates) {
    const allowedUpdates = ['title', 'description', 'ingredients', 'instructions', 'cuisine', 'prepTime', 'cookTime', 'servings', 'difficulty'];
    const updateData = {};

    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updateData[key] = updates[key];
      }
    });

    Object.assign(this.recipe, updateData);
    await this.recipe.save();
    return this.toPublicJSON();
  }

  // Instance method to delete recipe
  async deleteRecipe() {
    await Recipe.findByIdAndDelete(this.recipe._id);
  }

  // Instance method to toggle like on recipe
  async toggleLike(userId) {
    const isLiked = this.recipe.likes.includes(userId);
    
    if (isLiked) {
      this.recipe.likes = this.recipe.likes.filter(like => like.toString() !== userId.toString());
    } else {
      this.recipe.likes.push(userId);
    }

    await this.recipe.save();
    return { isLiked: !isLiked, likesCount: this.recipe.likes.length };
  }

  // Static method to check if user is author of recipe
  static async isAuthor(recipeId, userId) {
    const recipe = await Recipe.findById(recipeId);
    return recipe && recipe.author.toString() === userId;
  }
}

module.exports = RecipeClass;
