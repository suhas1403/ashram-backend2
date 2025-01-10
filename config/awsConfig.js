const { SNSClient } = require('@aws-sdk/client-sns');
require('dotenv').config();


const snsClient = new SNSClient({
  region: 'ap-south-1',  // Mumbai region for India
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

module.exports = snsClient;
