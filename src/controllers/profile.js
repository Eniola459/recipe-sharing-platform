const Profile = require("../models/profileModel");
const path = require("path");

// Create a profile
exports.createProfile = async (req, res) => {
  try {
    const { bio, firstName, lastName, twitterHandle, instagramHandle } = req.body;
    const userId = req.user._id; 

    // Handle avatar upload
    let avatarUrl = null;
    if (req.file) {
      avatarUrl = `/uploads/${req.file.filename}`; 
    }

    const newProfile = new Profile({
      bio,
      firstName,
      lastName,
      twitterHandle,
      instagramHandle,
      avatarUrl, 
      userId,
    });

    const savedProfile = await newProfile.save();
    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: savedProfile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get a profile by userId
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update a profile
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    // Handle avatar upload during profile update
    if (req.file) {
      updates.avatarUrl = `/uploads/${req.file.filename}`; 
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete a profile
exports.deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedProfile = await Profile.findOneAndDelete({ userId });

    if (!deletedProfile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// search profiles by firstName or lastName
exports.searchProfile = async (req, res) => {
    try {
      const { firstName, lastName } = req.query;
  
      // Construct a query object based on the available parameters
      let query = {};
  
      if (firstName) {
        query.firstName = { $regex: firstName, $options: "i" }; 
      }
  
      if (lastName) {
        query.lastName = { $regex: lastName, $options: "i" }; 
      }
  
      const profiles = await Profile.find(query);
  
      if (profiles.length === 0) {
        return res.status(404).json({ success: false, message: "Profile(s) not found" });
      }
  
      res.status(200).json({ success: true, data: profiles });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };
  