const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String], 
      required: true,
    },
    instructions: {
      type: [String], 
      required: true,
    },
    description: {
      type: String, 
    },
    media: [
      {
        type: String,
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: String,
        date: { type: Date, default: Date.now },  
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true, 
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
