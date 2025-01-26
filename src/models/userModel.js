const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: '' }, // optional
  socialHandles: { type: Map, of: String }, // optional social media links
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
