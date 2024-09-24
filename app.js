const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db'); // For PostgreSQL
// const connectDB = require('./config/db'); // For MongoDB
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/reviews', reviewRoutes);


// PostgreSQL sync
sequelize.sync().then(() => {
  console.log('Database connected');
}).catch(err => console.log('Error: ' + err));

// MongoDB connection
// connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
