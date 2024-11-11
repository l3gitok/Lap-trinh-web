const jwt = require('jsonwebtoken');
const JWT_SECRET = '1208'; 

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Yêu cầu đăng nhập' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token không hợp lệ' });
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;