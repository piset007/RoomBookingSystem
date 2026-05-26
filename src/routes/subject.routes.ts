import { Router } from 'express';
import SubjectController from '../controllers/SubjectController';

const router = Router();
const controller = new SubjectController();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
