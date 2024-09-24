const { Op, literal } = require('sequelize');
const Event = require('../models/Event');
const sequelize = require('../config/db'); // Make sure this path matches your structure
// const Event = require('../models/Event');  // Your Sequelize model

// Fetch all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll(); // For PostgreSQL
    // const events = await Event.find(); // For MongoDB
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add a new event
// const addEvent = async (req, res) => {
//   const { name, type, address, latitude, longitude, description, date_time } = req.body;

//   try {
//     const newEvent = await Event.create({
//       name,
//       type,
//       address,
//       latitude,
//       longitude,
//       description,
//       date_time,
//     });

//     res.json(newEvent);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

const addEvent = async (req, res) => {
    const { name, type, address, latitude, longitude, description, date_time } = req.body;
  
    try {
      const event = await Event.create({
        name,
        type,
        address,
        latitude, // These are still saved separately if needed
        longitude,
        description,
        date_time,
        location: { type: 'Point', coordinates: [longitude, latitude] } // Storing as GEOMETRY point
      });
  
      res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).send('Server error');
    }
  };
  

// const updateEvent = async (req, res) => {
//     const { id } = req.params;
//     const { name, type, address, latitude, longitude, description, date_time } = req.body;
  
//     try {
//       // Find the event by ID
//       let event = await Event.findByPk(id); // PostgreSQL
//       // let event = await Event.findById(id); // MongoDB
  
//       if (!event) {
//         return res.status(404).json({ msg: 'Event not found' });
//       }
  
//       // Update event details
//       event.name = name || event.name;
//       event.type = type || event.type;
//       event.address = address || event.address;
//       event.latitude = latitude || event.latitude;
//       event.longitude = longitude || event.longitude;
//       event.description = description || event.description;
//       event.date_time = date_time || event.date_time;
  
//       await event.save(); // PostgreSQL
//       // await event.save(); // MongoDB
  
//       res.json(event);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   };


const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, type, address, latitude, longitude, description, date_time } = req.body;
  
    try {
      let event = await Event.findByPk(id);
      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }
  
      // Update the event details, including location
      event.name = name || event.name;
      event.type = type || event.type;
      event.address = address || event.address;
      event.latitude = latitude || event.latitude;
      event.longitude = longitude || event.longitude;
      event.description = description || event.description;
      event.date_time = date_time || event.date_time;
      event.location = { type: 'Point', coordinates: [longitude, latitude] };
  
      await event.save();
  
      res.json(event);
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).send('Server error');
    }
  };
  

  const deleteEvent = async (req, res) => {
    const { id } = req.params;
  
    try {
      let event = await Event.findByPk(id); // PostgreSQL
      // let event = await Event.findById(id); // MongoDB
  
      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }
  
      await event.destroy(); // PostgreSQL
      // await event.remove(); // MongoDB
  
      res.json({ msg: 'Event removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  

// Function to fetch nearby events using sequelize


// const getNearbyEvents = async (req, res) => {
//     const { latitude, longitude, radius = 10 } = req.query;
//     console.log('Query params:', { latitude, longitude, radius });

  
//     try {
//       const nearbyEvents = await Event.findAll({
//         where: sequelize.literal(
//           `ST_DWithin(location, ST_MakePoint(${longitude}, ${latitude})::geography, ${radius * 1000})`
//         ),
//       });
      
//       res.json(nearbyEvents);
//     } catch (err) {
//       console.error('Error fetching nearby events:', err.message);
//       res.status(500).send('Server Error');
//     }
//   };
  
  

// New
// const getNearbyEvents = async (req, res) => {
//     const { latitude, longitude, radius = 10, type, sort } = req.query;
//     console.log('Query params:', { latitude, longitude, radius, type, sort });
  
//     try {
//       // Build the query object for filtering
//       const query = {
//         where: sequelize.literal(
//           `ST_DWithin(location, ST_MakePoint(${longitude}, ${latitude})::geography, ${radius * 1000})`
//         ),
//       };
  
//       // Add filter by event type if provided
//       if (type) {
//         query.where = {
//           ...query.where,
//           type, // Add the event type to the filter condition
//         };
//       }
  
//       // Add sorting by distance if required
//       if (sort === 'distance') {
//         query.order = [
//           [sequelize.literal(`ST_Distance(location, ST_MakePoint(${longitude}, ${latitude})::geography)`), 'ASC'],
//         ];
//       }
  
//       // Add sorting by date if required
//       if (sort === 'date') {
//         query.order = [['date_time', 'ASC']]; // Sort events by date
//       }
  
//       // Fetch the events based on filters and sorting
//       const nearbyEvents = await Event.findAll(query);
      
//       res.json(nearbyEvents);
//     } catch (err) {
//       console.error('Error fetching nearby events:', err.message);
//       res.status(500).send('Server Error');
//     }
//   };
  

 // Ensure Op and literal are imported
// const getNearbyEvents = async (req, res) => {
//   const { latitude, longitude, radius = 10, type, sort } = req.query;
//   console.log('Query params:', { latitude, longitude, radius, type, sort });

//   try {
//     // Define where clause for event type if provided
//     const whereClause = {};
//     if (type) {
//       whereClause.type = type; // Add event type to the where clause
//     }

//     // Define the query with the spatial condition as a raw SQL literal
//     const nearbyEvents = await Event.findAll({
//       where: {
//         ...whereClause,
//         [Op.and]: literal(
//           `ST_DWithin(location, ST_MakePoint(${longitude}, ${latitude})::geography, ${radius * 1000})`
//         ),
//       },
//       order: sort === 'distance' 
//         ? [literal(`ST_Distance(location, ST_MakePoint(${longitude}, ${latitude})::geography)`), 'ASC'] 
//         : sort === 'date' 
//         ? [['date_time', 'ASC']]
//         : undefined,
//     });

//     res.json(nearbyEvents);
//   } catch (err) {
//     console.error('Error fetching nearby events:', err.message);
//     res.status(500).send('Server Error');
//   }
// };

// const { Op, literal } = require('sequelize'); // Ensure Op and literal are imported
const getNearbyEvents = async (req, res) => {
  const { latitude, longitude, radius = 10, type, sort } = req.query;
  console.log('Query params:', { latitude, longitude, radius, type, sort });

  try {
    // Define where clause for event type if provided
    const whereClause = {};
    if (type) {
      whereClause.type = type; // Add event type to the where clause
    }

    // Define the query with the spatial condition as a raw SQL literal
    const nearbyEvents = await Event.findAll({
      where: {
        ...whereClause,
        [Op.and]: literal(
          `ST_DWithin(location, ST_MakePoint(${longitude}, ${latitude})::geography, ${radius * 1000})`
        ),
      },
      // Modify the order clause to correctly sort by distance or date
      order: sort === 'distance' 
        ? [[literal(`ST_Distance(location, ST_MakePoint(${longitude}, ${latitude})::geography)`), 'ASC']] 
        : sort === 'date' 
        ? [['date_time', 'ASC']]
        : undefined,
    });

    res.json(nearbyEvents);
  } catch (err) {
    console.error('Error fetching nearby events:', err.message);
    res.status(500).send('Server Error');
  }
};


const getEventById = async (req, res) => {
    try {
      const event = await Event.findByPk(req.params.id); // Find event by primary key (ID)
  
      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }
  
      res.json(event); // Return the event details as JSON
    } catch (err) {
      console.error('Error fetching event:', err.message);
      res.status(500).send('Server Error');
    }
  };

  

module.exports = { getEvents, addEvent, updateEvent, deleteEvent, getNearbyEvents, getEventById };
