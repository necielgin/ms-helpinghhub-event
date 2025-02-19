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
            return res.status(404).json({ message: 'Get Event: No events were found', id });
        }

        res.json(event);
    } catch (error) {
        next(error);
    }
};

export const createEvent = async (req, res, next) => {
    try {
        const event = await eventService.createEvent(req.body);
        res.status(201).json(event);
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await eventService.updateEvent(id, req.body);

        if (!event) {
            return res.status(404).json({ message: 'Update Error: No events were found', id });
        }

        res.json(event);
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await eventService.deleteEvent(id);
        if (!event) {
            return res.status(404).json({ message: 'Delete Error: No events were found', id });
        }
        res.json({message: "Event deleted successfully"});
    } catch (error) {
        next(error);
    }
};
