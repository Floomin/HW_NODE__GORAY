//Middleware to check for 'x-users-id' header
export const checkUserIdHeader = (req, res, next) => {
    const userId = req.headers['x-users-id'];
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized. Missing x-user-id header.' });
    }

    req.userId = userId;
    next();
};