import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(401).json({ errors: ['Crendentials are nulls'] });
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ errors: ['User doesn\'t exists'] });

    if (!(await user.passwordValidator(password))) { return res.status(401).json({ errors: ['Invalid password', user.password_hash] }); }

    const { id } = user;
    const token = jwt.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );
    return res.json({ token, user: { nome: user.nome, id, email } });
  }
}

export default new TokenController();
