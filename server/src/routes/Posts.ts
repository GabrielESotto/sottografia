import express from 'express';
import multer from 'multer';
import controller from '../controllers/Posts';

const router = express.Router();
const multerConfig = require('../config/multer')

router.post('/newfile', multer(multerConfig).single('file'), controller.createPost)
router.get('/allfiles', controller.getAllPosts)
router.delete('/deletefile/:id', controller.deletePost)

export = router;
