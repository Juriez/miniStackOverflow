const express = require('express');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const cors = require('cors'); // Import CORS

const app = express();

app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Routes
app.use('/user', authRoute);

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
