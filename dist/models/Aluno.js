"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 a 255 caracteres',
          },
        },
      },
      sobrenome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 a 255 caracteres',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      idade: {
        type: _sequelize2.default.INTEGER,
        defaultValue: '',
        isInt: {
          msg: 'A Idade precisa ser um número inteiro',
        },
      },
      peso: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        isFloat: {
          msg: 'O Peso precisa ser de número decimal',
        },
      },
      altura: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        isFloat: {
          msg: 'Altura precisa ser npumero decimal',
        },
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.hasMany(models.File, { foreignKey: 'aluno_id' });
  }
} exports.default = Aluno;
