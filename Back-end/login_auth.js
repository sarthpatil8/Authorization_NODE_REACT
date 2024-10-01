const User = require('./userModel');
const bcrypt = require('bcryptjs');
const { generateTokens } = require('./token');
const isValidPhoneNumber = require('./validphoneNumber');
require('dotenv').config();

async function loginMiddleware(req, res) {
  try {
    const { mobile_number, password } = req.body;

    // Check if mobile number is valid 
     if (!isValidPhoneNumber(mobile_number)) {
       return res.status(400).json({ message: 'Invalid mobile number' });
     }

    // Check if user exists
    const user = await User.findOne({ mobile_number });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Check if the user is already logged in
    if (user.status) {
      return res.status(409).json({ message: 'Already Logged In' });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken,user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = loginMiddleware;