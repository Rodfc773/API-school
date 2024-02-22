"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Files = require('../models/Files'); var _Files2 = _interopRequireDefault(_Files);

class AlunoController {
  async store(req, res) {
    try {
      const newStudent = await _Aluno2.default.create(req.body);

      const { nome, sobrenome } = newStudent;

      return res.status(200).json({ msg: `O aluno : ${`${nome} ${sobrenome}`} foi cadastrado com sucesso` });
    } catch (err) {
      return res.status(500).json({ errors: ['Internal error'] });
    }
  }

  async index(req, res) {
    try {
      const students = await _Aluno2.default.findAll({
        attributes: ['nome', 'sobrenome', 'idade'],
        order: [['id', 'DESC'], [_Files2.default, 'id', 'DESC']],
        include: {
          model: _Files2.default,
          attributes: ['url', 'filename'],
        },
      });

      return res.json(students);
    } catch (err) {
      return res.status(500).json({ errors: ['Internal error'] });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.body;

      if (!id) return res.status(400).json({ errors: ['Missing ID'] });

      const student = await _Aluno2.default.findByPk(id, {
        attributes: ['nome', 'sobrenome', 'idade'],
        order: [['id', 'DESC'], [_Files2.default, 'id', 'DESC']],
        include: {
          model: _Files2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!student) return res.status(400).json({ errors: ['Student do not exist'] });

      return res.json(student);
    } catch (err) {
      return res.status(500).json({ errors: ['Internal Error'] });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ['Missing ID'] });

      const student = await _Aluno2.default.findOne({
        where: {
          id,
        },
      });

      if (!student) return res.status(400).json({ errors: ['Student do not exist'] });

      const studentUpdated = await student.update(req.body);

      return res.status(200).json(studentUpdated);
    } catch (err) {
      return res.status(500).json({ errors: ['Internal Error'] });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ['Missing ID'] });

      const student = await _Aluno2.default.findOne({
        where: {
          id,
        },
      });

      if (!student) return res.status(400).json({ errors: ['Student do not exist'] });

      await student.destroy();

      return res.status(200).json({ Deleted: true });
    } catch (error) {
      return res.status(500).json({ errors: ['Internal Error'] });
    }
  }
}

exports. default = new AlunoController();
