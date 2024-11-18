
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Extract token from Authorization header
  console.log("Auth middleware triggered");
  const token = req.header('Authorization')?.replace('Bearer ', '');

  console.log('Token received:', token);  // Log to verify token received

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    console.log('JWT Secret:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);  // Log decoded token to check if it's correct

    req.user = decoded.userId; // Add userId from the decoded token to the request object
    console.log("hiiiiiiiii");
    next();
  } catch (err) {
    console.error('Token verification failed:', err);  // Log error
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


