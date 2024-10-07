//Import modules
import express from 'express';

import { checkUserIdHeader } from './middleware/authMiddleware.js';
import { errorHandler } from './middleware/errorMiddleware.js';

import userRoutes from './routes/user.js';
import productsRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';

//Define the port the server will listen on
const PORT = 3000;

//Create an instance of the express application
const app = express();

//Middleware to perse incoming JSON requests
app.use(express.json());

//Setting up routes for user, products, cart and order
app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', checkUserIdHeader, cartRoutes);
app.use('/api/orders', checkUserIdHeader, orderRoutes);

// Error handling middleware
app.use(errorHandler);

//Start the server and listen for requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
