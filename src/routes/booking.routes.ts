import { Router } from 'express';
import BookingController from '../controllers/BookingController';

const router = Router();
const controller = new BookingController();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
