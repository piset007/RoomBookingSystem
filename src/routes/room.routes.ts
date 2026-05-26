import { Router } from 'express';
import RoomController from '../controllers/RoomController';

const router = Router();
const controller = new RoomController();

router.get('/', controller.index);
router.get('/available', controller.available);
router.get('/:id', controller.show);
router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
