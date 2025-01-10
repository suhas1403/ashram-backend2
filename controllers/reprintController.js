const { getTokenDataForReprint } = require('../services/reprintService'); // Import the service

// Controller function to handle reprint logic
const handleReprint = async (req, res) => {
  const { tokenNumber, selectedDate, selectedSeva } = req.body; // Capture the values from the request body

  console.log('Received Data:', {
    tokenNumber,
    selectedDate,
    selectedSeva,
  }); // Log all the received data

  if (!tokenNumber) {
    return res.status(400).json({
      success: false,
      message: 'Token number is required.',
    });
  }

  if (!selectedDate || !selectedSeva) {
    return res.status(400).json({
      success: false,
      message: 'Both selected date and selected Seva are required.',
    });
  }

  try {
    // Call the service to get token data
    const tokenData = await getTokenDataForReprint(tokenNumber, selectedDate, selectedSeva);

    // Log the token data retrieved from the service
    console.log('Token Data Retrieved:', tokenData);

    // Return the response with the retrieved data
    res.json({
      success: true,
      message: 'Token data retrieved for reprint.',
      data: {
        tokenNumber: tokenData.tokennumber,
        selectedSeva: tokenData.selectedseva,
        dateTime: tokenData.datetime,
        personName: tokenData.personname,
        mobileNumber: tokenData.mobilenumber,
        ashramName: tokenData.ashramname,
        place: tokenData.place,
      },
    });
  } catch (error) {
    console.error('Error during reprint:', error); // Log the error
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  handleReprint,
};
