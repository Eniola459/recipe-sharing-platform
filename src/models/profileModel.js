const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  firstName: { type: String, required: true }, // If first name is required
  lastName: { type: String, required: true },  
  twitterHandle: { 
    type: String, 
    required: false, 
    match: /^@([A-Za-z0-9_]{1,15})$/,  // Regex to validate Twitter handle
  },
  instagramHandle: { 
    type: String, 
    required: false, 
    match: /^@([A-Za-z0-9_]{1,30})$/,  // Regex to validate Instagram handle
  },
  avatarUrl: { type: String, required: false },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,  // References the 'User' model
    ref: 'User',  // Creates a relationship with the User model
    required: true,  // Ensures that every profile is associated with a user
    index: true  // Improves the speed of queries looking up profiles by userId
  },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields
