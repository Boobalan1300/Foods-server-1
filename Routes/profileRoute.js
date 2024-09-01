
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');



router.get('/profile', authMiddleware, async (req, res) => {
  try {

      
       const userId = req.user.userId;
       
    const user = await User.findById(userId).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
