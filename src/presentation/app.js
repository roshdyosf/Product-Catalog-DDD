import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

import AppError from './utils/AppError.js';
import { globalErrorHandler } from './middlewares/errorMiddleware.js';

import productRouter from './routes/productRoutes.js';

const app = express();
// 1. Global Middlewares

// 1.1 Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// 1.2 Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// 1.3 Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// 1.4 Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// 1.5 Prevent parameter pollution
app.use(hpp());

// 2. Routes
// --- IGNORE ---


app.use('/api/v1/products', productRouter);



// 3. Handle unhandled routes
app.all(/(.*)/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 4. Global Error Handler
app.use(globalErrorHandler);

export default app;


