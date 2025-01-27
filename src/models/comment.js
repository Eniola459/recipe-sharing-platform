const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",  
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  
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
    timestamps: true, 
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
