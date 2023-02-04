require('dotenv').config()
import multer from "multer";
import path from 'path';
import crypto from 'crypto';


const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: (req, file: any, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) cb(err, file.originalname);

        file.key = `${hash.toString('hex')}-${file.originalname}`

        cb(null, file.key)
      })
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'uploadsottografia',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req: any, file: any, cb: any) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) cb(err, file.originalname);

        file.key = `${hash.toString('hex')}-${file.originalname}`

        cb(null, file.key)
      })
    }
  })
}

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes['local'],
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (req: any, file:any, cb:any) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/jpg',
      'image/png',
      'image/gif'
    ];

    if(allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  },
}
