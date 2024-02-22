import multer from 'multer';
import { extname, resolve } from 'path';

const random = () => Math.floor(Math.random() * 10000 + 10000);
export default {
  fileFilter: (req, file, cback) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cback(new multer.MulterError('Arquivo precisa ser PNG ou JPG'));
    }
    return cback(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
    },
  }),
};
