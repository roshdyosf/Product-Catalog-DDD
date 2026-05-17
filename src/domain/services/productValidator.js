import AppError from "../../presentation/utils/AppError.js";

export const validateProduct = (product) => {
    if (!product.name || typeof product.name !== 'string') {
        throw new AppError('Invalid product name', 400);
    }

    if (!product.price || typeof product.price !== 'number' || product.price <= 0) {
        throw new AppError('Invalid product price', 400);
    }

    if (!product.quantity || typeof product.quantity !== 'number') {
        throw new AppError('Invalid product quantity', 400);
    }

    if (!product.provider || typeof product.provider !== 'string') {
        throw new AppError('Invalid product provider', 400);
    }

    if (!product.description || typeof product.description !== 'string') {
        throw new AppError('Invalid product description', 400);
    }

    if (!product.id || typeof product.id !== 'string') {
        throw new AppError('Invalid product id', 400);
    }
};