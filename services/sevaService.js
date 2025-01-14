const db = require('../config/db'); // Database connection

// Function to generate token for Seva based on selected date and Seva
const generateSeva = async (selectedSeva, personName, ashramName, dateTime, mobileNumber,place) => {
  try {
    // Normalize the date (remove leading zeros and convert to standard format)
    const normalizeDate = (date) => {
      const [day, month, year] = date.split('/');
      return `${parseInt(day, 10)}/${parseInt(month, 10)}/${year}`;
    };

    const normalizedDate = normalizeDate(dateTime);

    // Fetch existing records for the selected Seva and dateTime to determine the last token number
    const query = `
      SELECT "tokenNumber"
      FROM "sevaData"
      WHERE "selectedSeva" = $1 AND "dateTime" = $2
      ORDER BY "tokenNumber" DESC LIMIT 1
    `;
    const values = [selectedSeva, normalizedDate];
    const result = await db.query(query, values);

    // Determine the next token number
    const lastTokenNumber = result.rows.length > 0 ? result.rows[0].tokennumber : 0;
    const tokenNumber = lastTokenNumber + 1;

    // Insert the new record into the database
    const insertQuery = `
      INSERT INTO "sevaData" ("selectedSeva", "personName", "tokenNumber", "ashramName", "dateTime", "mobileNumber","place")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const insertValues = [selectedSeva, personName, tokenNumber, ashramName, normalizedDate, mobileNumber,place];
    const insertResult = await db.query(insertQuery, insertValues);

    return insertResult.rows[0]; // Return the newly inserted record
  } catch (error) {
    console.error('Error generating Seva:', error);
    throw error;
  }
};

module.exports = {
  generateSeva,
};
