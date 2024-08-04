import Aluno from '../models/Aluno';
import File from '../models/Files';

class AlunoController {
  async store(req, res) {
    try {
      const newStudent = await Aluno.create(req.body);

      const { nome, sobrenome } = newStudent;

      return res.status(200).json({ msg: `O aluno : ${`${nome} ${sobrenome}`} foi cadastrado com sucesso` });
    } catch (err) {
      return res.status(500).json({ errors: ['Internal error'] });
    }
  }

  async index(req, res) {
    try {
      const students = await Aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'idade'],
        order: [['id', 'DESC'], [File, 'id', 'DESC']],
        include: {
          model: File,
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

      const student = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'idade'],
        order: [['id', 'DESC'], [File, 'id', 'DESC']],
        include: {
          model: File,
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

      const student = await Aluno.findOne({
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

      const student = await Aluno.findOne({
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

export default new AlunoController();
