const Recipe = require("../models/recipeModel"); 
const Comment = require("../models/comment"); 

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, description } = req.body;
    const media = req.files ? req.files.map(file => file.path) : [];

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      description,
      media,
      user: req.user.id, 
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a recipe by ID
exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a recipe by ID
exports.updateRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, description } = req.body;
    const media = req.files ? req.files.map(file => file.path) : [];

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      { title, ingredients, instructions, description, media },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Like a recipe by ID
exports.likeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.likes.includes(req.user.id)) {
      return res.status(400).json({ message: "You have already liked this recipe" });
    }

    recipe.likes.push(req.user.id);
    await recipe.save();

    res.status(200).json({ message: "Recipe liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Comment on a recipe by ID
exports.commentRecipe = async (req, res) => {
  try {
    const { comment } = req.body;

    const newComment = new Comment({
      recipe: req.params.recipeId,
      user: req.user.id,
      comment,
    });

    await newComment.save();

    res.status(201).json({ message: "Comment posted successfully", comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Search for recipes by title
exports.searchRecipesByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const recipes = await Recipe.find({
      title: { $regex: title, $options: 'i' },
    });

    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }

    res.status(200).json({ recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
