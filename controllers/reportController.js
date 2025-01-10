const { getSevaCountByDate } = require('../services/reportService');

// Utility function to format dates (remove leading zeros)
const formatDate = (date) => {
  return date.split('/').map(part => part.replace(/^0/, '')).join('/');
};

async function getSevaCount(req, res) {
  const { date } = req.body; // Extract date from the body

  // Log the data received (request body)
  console.log('Data received in request body:', req.body);

  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }

  // Normalize the date (remove leading zeros)
  const formattedDate = formatDate(date);

  try {
    const sevaCount = await getSevaCountByDate(formattedDate);

    // Log the data being sent (response data)
    console.log('Data sent in response:', sevaCount);

    res.json(sevaCount);
  } catch (error) {
    console.log('Error:', error); // Log the error
    res.status(500).json({ message: 'Error fetching Seva count', error });
  }
}

module.exports = { getSevaCount };
