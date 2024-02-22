import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 a 255 caracteres',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 a 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      idade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        isInt: {
          msg: 'A Idade precisa ser um número inteiro',
        },
      },
      peso: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        isFloat: {
          msg: 'O Peso precisa ser de número decimal',
        },
      },
      altura: {
        type: Sequelize.FLOAT,
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
}
