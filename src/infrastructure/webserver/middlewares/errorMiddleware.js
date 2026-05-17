import AppError from "../utils/AppError.js";


// 1. Cast Error
const handelCastErrorDB = err => new AppError(`Invalid ${err.path}: ${err.value}.`, 400);

// 2. Validation Error
const handelValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}


const sendErrorDev = (err, req, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
        isOperational: err.isOperational || false

    });
}

const sendErrorProd = (err, req, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            isOperational: err.isOperational || false
        });
        // Programming or other unknown error: don't leak error details
    }

    return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
        isOperational: err.isOperational || false

    });
}


export const globalErrorHandler = (err, req, res, next) => {

    // Set default values for errors not created by AppError
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Development error handling
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    }

    //production error handling
    else if (process.env.NODE_ENV === 'production') {
        let error = Object.create(Object.getPrototypeOf(err), Object.getOwnPropertyDescriptors(err));
        if (error.name === 'CastError') error = handelCastErrorDB(error);
        if (error.name === 'ValidationError') error = handelValidationErrorDB(error);
        sendErrorProd(error, req, res);
    }
    else {
        // Fallback for other environments
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            isOperational: err.isOperational || false

        });
    }
}