const jwt = require('jsonwebtoken');
const User = require('./userModel');
require('dotenv').config();

const generateTokens = (user) => {
  const payload = {
    userId: user._id,
    mobile: user.mobile_number // Include mobile number in payload
  };
  
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  
  return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

const refreshAccessToken = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    throw new Error('Invalid refresh token');
  }

  const user = await User.findById(decoded.userId);
  if (!user || user.refreshToken !== refreshToken) {
    throw new Error('User not found or refresh token revoked');
  }

  const tokens = generateTokens(user);
  
  user.refreshToken = tokens.refreshToken;
  await user.save();

  return tokens;
};

const tokenMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return res.status(403).json({ message: 'Invalid or expired access token' });
  }

  req.userId = decoded.userId;
  req.userMobile = decoded.mobile;
  next();
};

module.exports = {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
  refreshAccessToken,
  tokenMiddleware
};