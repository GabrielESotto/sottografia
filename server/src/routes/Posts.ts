import express from 'express';
import multer from 'multer';
import controller from '../controllers/Posts';
import app from '../../app'

const router = express.Router();
const multerConfig = require('../config/multer')

router.post('/newfile', multer(multerConfig).single('file'), controller.createPost)
router.get('/allfiles', controller.getAllPosts)
router.delete('/deletefile/:id', controller.deletePost)
router.delete('/deleteallfiles', controller.deleteAllPosts)
router.get('/ziplink', app.zipPost)
router.get('/download', app.downloadZip)

export = router;
