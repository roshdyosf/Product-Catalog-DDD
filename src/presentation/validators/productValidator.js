import Joi from "joi";
import AppError from "../utils/AppError.js";


export const validateCreateProduct = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required().messages({
            'string.base': 'Name must be a string',
            'string.empty': 'Name is required',
        }),
        price: Joi.number().positive().required().messages({
            'number.base': 'Price must be a number',
            'number.empty': 'Price is required',
        }),
        provider: Joi.string().min(3).max(100).required().messages({
            'string.base': 'Provider must be a string',
            'string.empty': 'Provider is required',
        }),
        description: Joi.string().min(3).max(100).required().messages({
            'string.base': 'Description must be a string',
            'string.empty': 'Description is required',
        }),
        quantity: Joi.number().min(0).required().messages({
            'number.base': 'Quantity must be a number',
            'number.empty': 'Quantity is required',
        }),
    });
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message).join('. ');
        return next(new AppError(`validation Error: ${errorMessages}`, 400));
    }
    req.body = value;
    next();


}