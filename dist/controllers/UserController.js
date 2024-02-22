"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async create(req, res) {
    try {
      const newUser = await _User2.default.create(req.body);
      const { id, email, nome } = newUser;
      res.json({ id, email, nome });
    } catch (e) {
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await _User2.default.findByPk(id);

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
      const user = await _User2.default.findByPk(req.userId);

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
      const selectedUser = await _User2.default.findByPk(req.userId);

      if (!selectedUser) return res.status(400).json({ errors: ['User not find'] });

      selectedUser.destroy();

      return res.json(selectedUser);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

exports. default = new UserController();
