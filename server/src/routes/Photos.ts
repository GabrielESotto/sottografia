import express from 'express';
import multer from 'multer';
import controller from '../controllers/Photos'

const { addPhotoValidation } = require('../middlewares/photoValidation')
const { imageUpload } = require('../middlewares/imageUpload')

const router = express.Router();

router.post('/add', imageUpload.single("image"), addPhotoValidation(), controller.addNewPhoto)
router.delete('/delete/:id', controller.deletePhoto)
router.get('/get', controller.getAllPhotos)
router.get('/getonly/:event', controller.getOnlySpecifyPhotos)

export = router;
   