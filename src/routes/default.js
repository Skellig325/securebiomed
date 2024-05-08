const express = require('express');
const User = require('../models/userSchema');

const router = express.Router();

router.get('/userinfo', async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.json({
      status: 'failed',
      errorMessage: 'Not logged in.',
    });
  }
  
  try {
    const user = await User.findOne({ username: req.session.username });
    if (!user) {
      return res.json({
        status: 'failed',
        errorMessage: 'User not found.',
      });
    }

    res.json({
      status: 'ok',
      errorMessage: '',
      username: user.username
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      errorMessage: 'Error retrieving user information.'
    });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({
        status: 'failed',
        errorMessage: 'Error logging out.',
      });
    }

    // Redirect to the login page after successful logout
    res.json({
      status: 'ok',
      redirect: '/signin.html'
    });
  });
});

module.exports = router;
