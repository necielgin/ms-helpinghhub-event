import eventService from '../services/eventService.js';

export const getAllEvents = async (req, res, next) => {
    try {
        const events = await eventService.getAllEvents();
        
        if (!events) {
            return res.status(404).json({ message: 'No events were found' });
        }

        res.json(events);
    } catch (error) {
        next(error);
    }
};

export const getEventById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await eventService.getEventById(id);

        if (!event) {
            return res.status(404).json({ message: 'No events were found' });
        }

        res.json(event);
    } catch (error) {
        next(error);
    }
};