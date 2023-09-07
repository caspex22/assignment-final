const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

// admin
exports.admin = (req, res) => {
    if (req.user.role === 'admin') {
      res.status(200).json({ message: 'Admin login successful' });
    } else {
      res.status(403).json({ message: 'Access denied. You are not an admin.' });
    }
  };

//Regis for user 
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'email is already taken' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Login for user
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
        return res.status(401).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, dotenv, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

// User Pofile
exports.getProfile = async(req, res) => {
    try {
        const user = req.user;
        res.status(200).json({user})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Update profile like Email
exports.updateProfile = async(req, res) => {
    
}