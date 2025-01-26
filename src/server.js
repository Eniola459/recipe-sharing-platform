require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/user');       
const profileRoutes = require('./routes/profile'); 
const recipeRoutes = require('./routes/recipe');   
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// CORS configuration for allowing cross-origin requests
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Swagger configuration to document the API
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe Sharing Platform API',
      version: '1.0.0',
      description: 'API documentation for the Recipe Sharing Platform',
    },
  },
  apis: ['./src/routes/*.js'],  
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware for JSON parsing 
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);  
  }
};


const PORT = process.env.PORT || 5000;

// Test route to ensure the server is running
app.get('/', (req, res) => {
  res.send('Welcome to the Recipe Sharing Platform!');
});

// Use routes for user, profile, and recipes
app.use('/api/users', userRoutes);       
app.use('/api/profiles', profileRoutes); 
app.use('/api/recipes', recipeRoutes);   

// Start the server and connect to the database
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  connectDB();  
});
