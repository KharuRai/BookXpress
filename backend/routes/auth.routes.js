import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { authenticateLogin, authenticateToken } from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();

// JWT Secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET || '2c7c38fa6176b7db559c2f9e86f9b53d33125685022574386639ad43468b019dd061be65ba76e377253f2c44fcf640153686cd896f11bc30b3fe3eab3f39e3b2';
// Set up multer for file uploads
// TODO: Configure storage location and filename
const upload = multer({ dest: 'uploads/' }); // Temporary destination

// Signup route
router.post('/signup', async (req, res) => {
  try {
    console.log('Received signup request with data:', {
      ...req.body,
      password: req.body.password ? '[REDACTED]' : undefined
    });
    
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      console.log('Missing required fields:', {
        name: !name,
        email: !email,
        password: !password
      });
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists (case-insensitive, trimmed)
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email: email.trim().toLowerCase(),
      password,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    // Handle mongoose duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Email already exists'
      });
    }

    res.status(500).json({ 
      message: 'Error creating user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login route
router.post('/login', authenticateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Refresh token route
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_SECRET);

    // Generate new access token
    const token = jwt.sign(
      { userId: decoded.userId },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

// Change password endpoint
router.post('/change-password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  console.log('Change password request received for user ID:', req.user.userId);
  console.log('Current password provided:', currentPassword ? '[provided]' : '[not provided]');
  console.log('New password provided:', newPassword ? '[provided]' : '[not provided]');

  if (!currentPassword || !newPassword) {
    console.log('Missing required fields');
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      console.log('User not found for ID:', req.user.userId);
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('User found:', user.email);

    const isMatch = await user.comparePassword(currentPassword);
    console.log('Password comparison result:', isMatch);

    if (!isMatch) {
      console.log('Current password incorrect');
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    user.password = newPassword; // This should trigger the pre-save hook
    console.log('New password assigned, attempting to save...');
    await user.save();
    console.log('Password saved successfully');

    res.json({ success: true });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update profile endpoint
router.post('/update-profile', authenticateToken, upload.single('profilePicture'), async (req, res) => {
  const { name, phone } = req.body; // Access text fields
  const profilePictureFile = req.file; // Access the uploaded file

  const userId = req.user._id;
  console.log(`Profile update request received for user ID: ${userId}`);
  console.log('Received data:', { name, phone });
  console.log('Received file:', profilePictureFile);

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found for ID:', userId);
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('User found:', user.email);

    // Update fields if provided
    if (name !== undefined) {
      user.name = name;
      console.log('Updating name to:', name);
    }
    if (phone !== undefined) {
      user.phone = phone;
      console.log('Updating phone to:', phone);
    }

    // Handle profile picture update
    if (profilePictureFile) {
      // TODO: Implement actual file storage (e.g., to a cloud storage or a permanent directory)
      // For now, just save the temporary path or a placeholder
      user.profilePicture = `/uploads/${profilePictureFile.filename}`; // Return the URL for static access
      console.log('Updating profile picture path to:', profilePictureFile.path);
    }

    await user.save();
    console.log('Profile saved successfully');

    // Return updated user info (excluding sensitive data like password)
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone, // Include phone in the response
        profilePicture: user.profilePicture, // Include profile picture URL
      },
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Export both the router and the auth middleware
export { authenticateToken as auth };
export default router; 
