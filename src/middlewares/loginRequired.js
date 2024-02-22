import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ errors: ['Login Required'] });

  const tokenString = authorization.split(' ');

  const token = tokenString[1];

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) return res.status(401).json({ errors: ['Invalid User'] });
    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(401).json({ errors: ['Expired or invalid token'] });
  }
};
