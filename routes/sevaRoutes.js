// routes/sevaRoutes.js
const express = require('express');
const router = express.Router();  // Create a new router instance

// Import the function to handle your seva generation
const { generateSeva, handleGenerateSeva } = require('../controllers/sevaController');

// Define the POST route for seva generation
router.post('/generate', handleGenerateSeva);

// Export the router so it can be used in the main app
module.exports = router;
