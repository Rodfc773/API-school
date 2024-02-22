import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, email, nome } = newUser;
      res.json({ id, email, nome });
    } catch (e) {
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) { res.status(400).json({ errors: ['User not find'] }); }

      const { nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      // return res.json(e);
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) return res.status(400).json({ errors: ['User not find'] });

      const userUpdated = await user.update(req.body);

      const { id, nome, email } = userUpdated;

      return res.json([{ id, nome, email }]);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const selectedUser = await User.findByPk(req.userId);

      if (!selectedUser) return res.status(400).json({ errors: ['User not find'] });

      selectedUser.destroy();

      return res.json(selectedUser);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

export default new UserController();
