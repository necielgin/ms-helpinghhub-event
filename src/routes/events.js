import express from 'express';
import { validateApiKey } from '../middlewares/errorHandler.js';
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controller/eventController.js';

const router = express.Router();

router.get('/', validateApiKey, getAllEvents);
router.get('/:id', validateApiKey, getEventById);
router.post('/', validateApiKey, createEvent);
router.put('/:id', validateApiKey, updateEvent);
router.delete('/:id', validateApiKey, deleteEvent);

export default router;