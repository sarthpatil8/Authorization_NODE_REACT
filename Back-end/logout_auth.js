const User = require('./userModel');

async function logoutMiddleware(req, res) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.refreshToken = null;
    await user.save();

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = logoutMiddleware;