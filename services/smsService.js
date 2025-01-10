const { PublishCommand } = require('@aws-sdk/client-sns');
const snsClient = require('../config/awsConfig'); // Import the AWS config

const sendSms = async (mobileNumber, message) => {
  // Ensure the number starts with +91
  if (!mobileNumber.startsWith('+91')) {
    mobileNumber = `+91${mobileNumber}`;
  }

  const params = {
    PhoneNumber: mobileNumber,
    Message: message,
  };

  console.log(`Sending SMS to ${mobileNumber} with message: ${message}`);

  try {
    const command = new PublishCommand(params);
    const data = await snsClient.send(command);
    console.log('SMS sent successfully:', data);
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

module.exports = { sendSms };
