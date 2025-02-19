export const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
};

export const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // Get API key from headers

    if (!apiKey) {
        return res.status(401).json({ message: 'API key is required' });
    }

    if (apiKey !== process.env.SECRET_API_KEY) {
        return res.status(403).json({ message: 'Invalid API key' });
    }

    next(); // Move to the next middleware/controller
};
