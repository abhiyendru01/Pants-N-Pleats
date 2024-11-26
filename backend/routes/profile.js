// routes/profile.js
const express = require('express');
const upload = require('../middleware/upload');
const User = require('../models/userModel');

const router = express.Router();

router.post('/profile', upload.single('avatar'), async (req, res) => {
  const { name, phone, birthDate } = req.body;
  let avatarUrl = req.file ? `/uploads/avatars/${req.file.filename}` : null;

  try {
    // Save or update user profile
    const user = await User.findOneAndUpdate(
      { _id: req.user.id }, // Assume user ID is available via auth middleware
      { name, phone, birthDate, avatar: avatarUrl },
      { new: true, upsert: true }
    );
    
    res.status(200).json({ message: 'Profile saved successfully', user });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ message: 'Failed to save profile' });
  }
});

module.exports = router;
