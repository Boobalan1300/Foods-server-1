

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtTokenSecretKey } = require('../config/config');

async function signUp(req, res) {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User Email already exists' });
    }

    user = new User({ email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = jwt.sign({ userId: user._id }, jwtTokenSecretKey, { expiresIn: '1h' });

    res.status(201).json({ token, email: user.email });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

async function login(req, res) {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, jwtTokenSecretKey, { expiresIn: '1h' });
  
      res.json({ token, email: user.email });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }

module.exports = { signUp, login };
