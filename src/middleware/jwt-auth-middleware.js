import jwt from 'jsonwebtoken';

const SecretKey = process.env.SECRET_KEY;

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']; // Pega o token do header Authorization
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  } else {
    jwt.verify(token, SecretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      next();
    });
  }
};

export { authenticateToken };
