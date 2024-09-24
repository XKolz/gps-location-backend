// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Event = sequelize.define('Event', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   type: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   latitude: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   longitude: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.TEXT,
//   },
//   date_time: {
//     type: DataTypes.DATE,
//   },
// });

// module.exports = Event;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure your db config is set up

const Event = sequelize.define('Event', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT, // You can keep latitude and longitude if needed for reference
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  // Adding location as a geography type for PostGIS
  location: {
    type: DataTypes.GEOMETRY('POINT', 4326), // Use 'GEOMETRY' to store geographic data as POINT
    allowNull: false,
  },
}, {
  timestamps: true, // If you need createdAt and updatedAt
});

module.exports = Event;
