import jwt from 'jsonwebtoken';


const userControlAuth = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.split(' ')[1]; // Token'ı al

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'menimkodum12'); // Token'ı çöz ve doğrula
    req.user = decoded; // Kullanıcı bilgilerini req.user'a ata
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const adminControlAuth = (req, res, next) => {
    if (req.user && req.user.userType === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden - only admins can perform this action' });
    }
};

export { userControlAuth , adminControlAuth };
