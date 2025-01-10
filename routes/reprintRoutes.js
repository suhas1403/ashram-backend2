const express = require('express');
const router = express.Router();
const { handleReprint } = require('../controllers/reprintController');  // Import the controller

// Route to get data associated with a token number for reprint via POST
router.post('/reprint', handleReprint);  // Use the controller function

module.exports = router;
