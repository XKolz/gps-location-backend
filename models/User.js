const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookmarks: {
    type: DataTypes.ARRAY(DataTypes.INTEGER), // Array of event IDs
    defaultValue: [],
  },
});

module.exports = User;
