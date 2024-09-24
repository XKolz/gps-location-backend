const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db'); // For PostgreSQL
const path = require('path');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/reviews', reviewRoutes);

// Root route serves the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// PostgreSQL sync
sequelize.sync().then(() => {
  console.log('Database connected');
}).catch(err => console.log('Error: ' + err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
