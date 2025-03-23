// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Create payload with user id and role
    const payload = { userId: user._id, role: user.role };
    // Sign JWT token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Registration endpoint (for "society" or "student" only)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  // Only allow society/student
  if (!['society', 'student'].includes(role)) {
    return res.status(400).json({ message: 'Invalid user role for signup' });
  }
  try {
    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
});

module.exports = router;
