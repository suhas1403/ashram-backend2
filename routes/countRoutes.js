const express = require('express');
const { getCount } = require('../controllers/countController');

const router = express.Router();

// Route to get count of entries for a specific date and selected option
router.post('/entries', getCount);

module.exports = router;
