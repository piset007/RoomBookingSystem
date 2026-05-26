const express = require('express');
const RoomController = require('../controllers/RoomController');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { validateMiddleware, createRoomSchema } = require('../middlewares/validate.middleware');

const router = express.Router();
const roomController = new RoomController();

// Apply auth middleware to all room routes
router.use(authMiddleware);

// Public room routes (authenticated users)
router.get('/', (req, res) => roomController.getAllRooms(req, res));
router.get('/available', (req, res) => roomController.getAvailableRooms(req, res));
router.get('/:id', (req, res) => roomController.getRoomById(req, res));

// Admin-only routes
router.post(
  '/',
  roleMiddleware(['ADMIN']),
  validateMiddleware(createRoomSchema),
  (req, res) => roomController.createRoom(req, res)
);

router.put(
  '/:id',
  roleMiddleware(['ADMIN']),
  (req, res) => roomController.updateRoom(req, res)
);

router.delete(
  '/:id',
  roleMiddleware(['ADMIN']),
  (req, res) => roomController.deleteRoom(req, res)
);

module.exports = router;
