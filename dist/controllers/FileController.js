"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable camelcase */
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _Files = require('../models/Files'); var _Files2 = _interopRequireDefault(_Files);

const upload = _multer2.default.call(void 0, _multer4.default).single('image');

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
        const file = await _Files2.default.create({ originalname, filename, aluno_id });

        return res.json(file);
      } catch (err) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}

exports. default = new FileController();
