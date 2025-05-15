import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      code: 401,
      message: 'Token not found',
      data: null,
      pagination: null
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'SECRET'); // ganti 'SECRET' dengan env var
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: 'Token invalid',
      data: null,
      pagination: null
    });
  }
};
