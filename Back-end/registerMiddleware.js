const User = require('./userModel');
const bcrypt = require('bcryptjs');

const { generateTokens } = require('./token');
const isValidPhoneNumber = require('./validphoneNumber');
require('dotenv').config();

async function registerMiddleware(req, res) {
  try {
    const { name, mobile_number, password, password_confirmation } = req.body
    
    // Check if any required field is missing
    if (!name || !mobile_number || !password || !password_confirmation ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
   

    // Check if it is a valid mobile number
    if (!isValidPhoneNumber(mobile_number)) {
      return res.status(422).json({ message: 'Invalid mobile number' });
    }

    // Check if mobile number already exists
    const existingUser = await User.findOne({ mobile_number });
    if (existingUser) {
      return res.status(409).json({ message: 'Mobile number already exists' });
    }

    // Check if password matches password_confirmation
    if (password !== password_confirmation) {
      return res.status(400).json({ message: 'Password and confirmation do not match' });
    }

    // Handle current date
    //const currentDate = current_date ? new Date(current_date) : new Date();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      mobile_number,
      password: hashedPassword,
    });

    await newUser.save();

    const { accessToken, refreshToken } = generateTokens(newUser);

    newUser.refreshToken = refreshToken;
    await newUser.save();
    res.status(201).json({ 
      message: 'User registered successfully',
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = registerMiddleware;