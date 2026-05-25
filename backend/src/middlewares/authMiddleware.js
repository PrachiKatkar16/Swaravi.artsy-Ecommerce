const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
  try {

    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized, no token',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Get user
    req.user = await User.findById(decoded.id).select('-password');

    next();

  } catch (error) {
    return res.status(401).json({
      message: 'Not authorized, token failed',
    });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({
      message: 'Admin access only',
    });
  }
};

module.exports = {
  protect,
  admin
};