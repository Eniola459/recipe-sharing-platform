const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",  // Reference to the Recipe model
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // Reference to the User model (if you're associating users with comments)
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
