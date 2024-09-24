const express = require('express');
const { registerUser, loginUser, bookmarkEvent } = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/bookmark', authMiddleware, bookmarkEvent); // Bookmark event

module.exports = router;
