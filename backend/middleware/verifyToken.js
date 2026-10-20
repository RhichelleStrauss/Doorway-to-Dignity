const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Not logged in.' });
    }


     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

     const user = await User.findById(decoded.id);
         if (!user) {
           return res.status(401).json({ message: 'User no longer exists.' });
         }

    req.user = user;
    next();

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Invalid token. Please log in again.' });
  }
};

module.exports = verifyToken;