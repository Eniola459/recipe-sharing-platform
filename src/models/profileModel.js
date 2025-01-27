const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  firstName: { type: String, required: true }, 
  lastName: { type: String, required: true },  
  twitterHandle: { 
    type: String, 
    required: false, 
    match: /^@([A-Za-z0-9_]{1,15})$/,  
  },
  instagramHandle: { 
    type: String, 
    required: false, 
    match: /^@([A-Za-z0-9_]{1,30})$/,  
  },
  avatarUrl: { type: String, required: false },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',  
    required: true,  
    index: true  
  },
}, { timestamps: true });  
