import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.post('/create', controller.createAdminUser)
router.post('/login', controller.loginUser)

export = router;
