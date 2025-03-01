"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class TokenController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(401).json({ errors: ['Crendentials are nulls'] });
    const user = await _User2.default.findOne({ where: { email } });

    if (!user) return res.status(401).json({ errors: ['User doesn\'t exists'] });

    if (!(await user.passwordValidator(password))) { return res.status(401).json({ errors: ['Invalid password', user.password_hash] }); }

    const { id } = user;
    const token = _jsonwebtoken2.default.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );
    return res.json({ token, user: { nome: user.nome, id, email } });
  }
}

exports. default = new TokenController();
