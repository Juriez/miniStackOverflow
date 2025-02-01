const express = require('express');
const connectDB = require('./config/db');
const notificationRoute = require('./routes/notificationRoute');
require('./jobs/notificationCleaner');
const cors = require('cors'); // Import CORS

const app = express();

app.use(express.json());
app.use(cors());


// Connect to database
connectDB();

// Routes
app.use('/notification', notificationRoute);

const PORT = 8003;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});