const db = require('../config/db'); // Import the database connection

// Utility function to format dates (remove leading zeros)
const formatDate = (date) => {
  return date.split('/').map(part => part.replace(/^0/, '')).join('/');
};

async function getSevaCountByDate(date) {
  const formattedDate = formatDate(date); // Normalize the date from the request
  console.log("Searching for formatted date:", formattedDate);

  try {
    // Query to get counts for each selectedSeva on the specific date
    const query = `
      SELECT selectedSeva, COUNT(*) AS count 
      FROM sevaData 
      WHERE dateTime = $1 
      GROUP BY selectedSeva
    `;
    const values = [formattedDate];

    // Execute the query and get results
    const result = await db.query(query, values);

    console.log("Query result:", result.rows); // Log the query result

    // Map the result into a more structured format
    const sevaCount = result.rows.reduce((acc, row) => {
      acc[row.selectedseva] = row.count;
      return acc;
    }, {});

    return sevaCount;
  } catch (error) {
    console.log("Error fetching Seva count:", error);
    throw new Error('Error fetching Seva count');
  }
}

module.exports = { getSevaCountByDate };
