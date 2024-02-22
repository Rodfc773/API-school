/* eslint-disable camelcase */
import multer from 'multer';

import multerConfig from '../config/multer';
import File from '../models/Files';

const upload = multer(multerConfig).single('image');

class FileController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const file = await File.create({ originalname, filename, aluno_id });

        return res.json(file);
      } catch (err) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}

export default new FileController();
