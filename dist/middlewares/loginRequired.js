"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ errors: ['Login Required'] });

  const tokenString = authorization.split(' ');

  const token = tokenString[1];

  try {
    const data = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await _User2.default.findOne({
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
