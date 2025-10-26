const express = require('express');
const router = express.Router();
const UserClass = require('../classes/User');
const { authenticate } = require('../middleware/auth');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const result = await UserClass.register(username, email, password);
    res.status(201).json({
      message: 'User registered successfully',
      ...result
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const result = await UserClass.login(email, password);
    res.json({
      message: 'Login successful',
      ...result
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Get current user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const userInstance = new UserClass(req.user);
    const profile = userInstance.getPublicProfile();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const userInstance = new UserClass(req.user);
    const updatedProfile = await userInstance.updateProfile(req.body);
    res.json({
      message: 'Profile updated successfully',
      user: updatedProfile
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
