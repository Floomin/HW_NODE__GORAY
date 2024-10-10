export const errorHandler = (err, req, res) => {
    console.error(err.stack);

    if (err.isJoi) {
        return res.status(400).json({ error: err.details[0].message });
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ error: err.message || 'An unexpected error occurred' });
};