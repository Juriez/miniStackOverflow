const express = require('express');
const connectDB = require('./config/db');
const postRoute = require('./routes/postRoute');

const app = express();
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/post', postRoute);

const PORT = 8002;
app.listen(PORT, () => {
  console.log(`Post Service running on port ${PORT}`);
});