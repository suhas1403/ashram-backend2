const { generateSeva } = require('../services/sevaService'); // Import the service

// Controller function to generate Seva token
const handleGenerateSeva = async (req, res) => {
  const { selectedSeva, personName, ashramName, dateTime, mobileNumber,place } = req.body;

  // Validate input
  if (!selectedSeva || !personName || !ashramName || !dateTime || !mobileNumber || !place) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Call the service to generate the Seva token and save the record
    const newSeva = await generateSeva(selectedSeva, personName, ashramName, dateTime, mobileNumber,place);

    // Return the response with the generated data
    res.status(200).json({
      selectedSeva: newSeva.selectedseva,
      personName: newSeva.personname,
      tokenNumber: newSeva.tokennumber,
      ashramName: newSeva.ashramname,
      dateTime: newSeva.datetime,
      mobileNumber: newSeva.mobilenumber,
      place: newSeva.place,
    });
  } catch (error) {
    console.error('Error generating Seva:', error);
    res.status(500).json({ message: 'Error generating Seva' });
  }
};

module.exports = {
  handleGenerateSeva,
};
