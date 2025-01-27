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
