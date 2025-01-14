// const db = require('../config/db');  // Import the PostgreSQL connection

// Controller to get count of entries for a specific date and selected option
const getCount = async (req, res) => {
  const { date, selectedOption } = req.body;

  // Validate input
  if (!date || !selectedOption) {
    return res.status(400).json({ message: 'Date and selectedOption are required' });
  }

  try {
    // Query to count records matching the date and selected option
    const query = `
      SELECT COUNT(*) 
      FROM "sevaData" 
      WHERE "dateTime" = ? AND "selectedSeva" = ?
    `;
    const values = [date, selectedOption];
    console.log(values)
    const result = await db.raw(query, values);

    // Send the count as the response
    res.status(200).json({ count: result.rows[0].count });
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ message: 'Error querying the database' });
  }
};

module.exports = { getCount };
