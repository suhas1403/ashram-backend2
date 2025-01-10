const express = require('express');
const { sendSms } = require('../services/smsService');

const router = express.Router();

// POST route for sending SMS
router.post('/send-sms', async (req, res) => {
  const { mobileNumber, message } = req.body;
  

  try {
    await sendSms(mobileNumber, message);
    res.status(200).json({ success: true, message: 'SMS sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending SMS', error: error.message });
  }
});

module.exports = router;
