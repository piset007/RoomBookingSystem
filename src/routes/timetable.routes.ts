import { Router } from 'express';
import TimeTableController from '../controllers/TimeTableController';

const router = Router();
const controller = new TimeTableController();

router.get('/', controller.index);
router.get('/room/:roomId', controller.byRoom);
router.get('/:id', controller.show);
router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
