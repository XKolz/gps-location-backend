const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User Registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ where: { email } }); // PostgreSQL
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = await User.create({ name, email, password: hashedPassword }); // PostgreSQL

    // Create and return a JWT token
    const payload = {
      user: {
        id: user.id, // For PostgreSQL
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ where: { email } }); // PostgreSQL
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and return a JWT token
    const payload = {
      user: {
        id: user.id, // For PostgreSQL
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Bookmark Event
const bookmarkEvent = async (req, res) => {
    
    const { eventId } = req.body;
  
    try {
      let user = await User.findByPk(req.user.id); // PostgreSQL
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Add event to bookmarks if not already bookmarked
      if (!user.bookmarks.includes(eventId)) {
        user.bookmarks.push(eventId);
        await user.save();
      }
  
      res.json(user.bookmarks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

module.exports = { registerUser, loginUser, bookmarkEvent };
