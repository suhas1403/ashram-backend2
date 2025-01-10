// routes/reportRouter.js

const express = require('express');
const { getSevaCount } = require('../controllers/reportController');

const reportRouter = express.Router();

// Define the route for getting Seva count by date (POST method)
reportRouter.post('/seva-count', getSevaCount);

module.exports = reportRouter;
