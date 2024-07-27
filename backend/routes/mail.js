const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { sendEmail } = require('../utils/mailer');

router.post('/send-email', async (req, res) => {
  const { subject, text, html } = req.body;

  try {
    const users = await User.find();
    const emailPromises = users.map(user => sendEmail(user.email, subject, text, html));

    await Promise.all(emailPromises);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Error sending emails' });
  }
});

module.exports = router;