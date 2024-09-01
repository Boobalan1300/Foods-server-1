// // routes/auth.js
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const { jwtTokenSecretKey } = require('../config/config');
// const authMiddleware = require('../middleware/authMiddleware');

// const router = express.Router();

// // Middleware to protect routes
// router.get('/check-auth',authMiddleware, (req, res) => {
//     const authHeader = req.header('Authorization');

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         // Verify token
//         jwt.verify(token, jwtTokenSecretKey);
//         res.status(200).json({ valid: true });
//     } catch (error) {
//         // Token is invalid or expired
//         res.status(401).json({ valid: false, message: 'Invalid or expired token' });
//     }
// });

// // router.get('/check-auth', authMiddleware, (req, res) => {
// //     res.json({ valid: true });
// //   });

// module.exports = router;






const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtTokenSecretKey } = require('../config/config');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/check-auth', authMiddleware, (req, res) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        
        jwt.verify(token, jwtTokenSecretKey);
        res.status(200).json({ valid: true });
    } catch (error) {
      
        res.status(401).json({ valid: false, message: 'Invalid or expired token' });
    }
});

module.exports = router;
