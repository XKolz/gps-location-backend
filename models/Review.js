const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Event = require('./Event');

const Review = sequelize.define('Review', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id',
    },
  },
});

module.exports = Review;
