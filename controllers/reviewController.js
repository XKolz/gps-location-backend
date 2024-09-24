const Review = require('../models/Review');

const addReview = async (req, res) => {
  const { eventId, rating, comment } = req.body;

  try {
    const newReview = await Review.create({
      userId: req.user.id,
      eventId,
      rating,
      comment,
    });

    res.json(newReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getEventReviews = async (req, res) => {
  const { eventId } = req.params;

  try {
    const reviews = await Review.findAll({ where: { eventId } }); // PostgreSQL
    // const reviews = await Review.find({ event: eventId }); // MongoDB

    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { addReview, getEventReviews };
