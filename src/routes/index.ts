import { Router } from 'express';
import authRoutes from './auth.routes';
import bookingRoutes from './booking.routes';
import roomRoutes from './room.routes';
import subjectRoutes from './subject.routes';
import timetableRoutes from './timetable.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);
router.use('/subjects', subjectRoutes);
router.use('/timetables', timetableRoutes);

export default router;
