import { Router } from 'express';
import BookingController from '../controllers/BookingController';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();
const controller = new BookingController();

router.get('/', authMiddleware, controller.index);
router.get('/:id', authMiddleware, controller.show);
router.post('/', authMiddleware, controller.store);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.destroy);

export default router;
