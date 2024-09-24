const express = require('express');
const { addReview, getEventReviews } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addReview);
router.get('/:eventId', getEventReviews);

module.exports = router;
