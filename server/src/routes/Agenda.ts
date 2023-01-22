import express from 'express';
import controller from '../controllers/Agenda';

const router = express.Router();

router.post('/new', controller.addNewSchedule)
router.get('/get', controller.getAllSchedules)
router.delete('/delete/:id', controller.deleteSchedule)
router.patch('/update/:id', controller.updateSchedule)

export = router;
