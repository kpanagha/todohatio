require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');



const app = express();
require("./conn/conn");
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const todoRoutes = require('./routes/todos');
const authMiddleware = require('./middleware/authMiddleware');


// MongoDB connection URI


// Connect to MongoDB using Mongoose


// Middleware and routes setup (if needed)
app.use(express.json());
app.use(cors());  // Enable CORS for all routes


app.use('/auth', authRoutes);
app.use('/projects', authMiddleware, projectRoutes);  // Protect routes with authMiddleware
app.use('/todos', authMiddleware, todoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
