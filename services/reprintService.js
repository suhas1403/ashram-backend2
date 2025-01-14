const db = require('../config/db'); // Import the database connection

// Function to fetch data associated with the token number
const getTokenDataForReprint = async (tokenNumber, selectedDate, selectedSeva) => {
  try {
    console.log('Inputs Received:');
    console.log('Token Number:', tokenNumber);
    console.log('Selected Date:', selectedDate);
    console.log('Selected Seva:', selectedSeva);

    // Normalize the date (remove leading zeros and convert to standard format)
    const normalizeDate = (date) => {
      const [day, month, year] = date.split('/');
      return `${parseInt(day, 10)}/${parseInt(month, 10)}/${year}`;
    };

    const normalizedSelectedDate = normalizeDate(selectedDate);
    console.log('Normalized Selected Date:', normalizedSelectedDate);

    // Query to fetch the token data from the database
    const query = `
      SELECT * 
      FROM "sevaData"
      WHERE "tokenNumber" = $1
        AND "dateTime" = $2
        AND "selectedSeva" = $3
    `;
    const values = [tokenNumber, normalizedSelectedDate, selectedSeva];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('Token data not found. Please check the inputs.');
    }

    const tokenData = result.rows[0]; // Assuming only one row matches
    console.log('Token Data to be returned:', tokenData);

    return tokenData;
  } catch (error) {
    console.error('Error in getTokenDataForReprint:', error);
    throw error;
  }
};

module.exports = {
  getTokenDataForReprint,
};
