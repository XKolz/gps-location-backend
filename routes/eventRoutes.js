// const express = require('express');
// const { getEvents, addEvent } = require('../controllers/eventController');
// const router = express.Router();

// router.get('/', getEvents);
// router.post('/', addEvent);

// module.exports = router;
const express = require('express');
const { getEvents, addEvent, updateEvent, deleteEvent, getNearbyEvents, getEventById } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', authMiddleware, addEvent);
router.put('/:id', authMiddleware, updateEvent);  // Edit event
router.delete('/:id', authMiddleware, deleteEvent); // Delete event
router.get('/search/nearby', getNearbyEvents); // Get nearby events
// router.post('/bookmark', authMiddleware, bookmarkEvent); // Bookmark event


module.exports = router;
