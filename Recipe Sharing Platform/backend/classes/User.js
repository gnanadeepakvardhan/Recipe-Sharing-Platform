const jwt = require('jsonwebtoken');
const User = require('../models/User');

class UserClass {
  constructor(user) {
    this.user = user;
  }

  // Static method to create JWT token
  static generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  }

  // Instance method to get user profile (sanitized)
  getPublicProfile() {
    return {
      _id: this.user._id,
      username: this.user.username,
      email: this.user.email,
      createdAt: this.user.createdAt
    };
  }

  // Static method to register a new user
  static async register(username, email, password) {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    // Create new user
    const user = await User.create({ username, email, password });
    return {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      },
      token: this.generateToken(user._id)
    };
  }

  // Static method to authenticate and login user
  static async login(email, password) {
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user._id);

    return {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      },
      token
    };
  }

  // Instance method to update user profile
  async updateProfile(updates) {
    const allowedUpdates = ['username', 'email'];
    const updateData = {};

    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updateData[key] = updates[key];
      }
    });

    if (Object.keys(updateData).length === 0) {
      throw new Error('No valid fields to update');
    }

    // Check for duplicate username or email
    if (updateData.email || updateData.username) {
      const existingUser = await User.findOne({
        $or: [
          ...(updateData.email ? [{ email: updateData.email }] : []),
          ...(updateData.username ? [{ username: updateData.username }] : [])
        ],
        _id: { $ne: this.user._id }
      });

      if (existingUser) {
        throw new Error('Username or email already taken');
      }
    }

    Object.assign(this.user, updateData);
    await this.user.save();
    return this.getPublicProfile();
  }
}

module.exports = UserClass;
