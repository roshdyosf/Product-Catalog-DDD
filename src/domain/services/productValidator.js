export const validateProduct = (product) => {
    if (!product.name || typeof product.name !== 'string') {
        throw new Error('Invalid product name');
    }

    if (!product.price || typeof product.price !== 'number' || product.price <= 0) {
        throw new Error('Invalid product price');
    }

    if (!product.quantity || typeof product.quantity !== 'number') {
        throw new Error('Invalid product quantity');
    }

    if (!product.provider || typeof product.provider !== 'string') {
        throw new Error('Invalid product provider');
    }

    if (!product.description || typeof product.description !== 'string') {
        throw new Error('Invalid product description');
    }

    if (!product.id || typeof product.id !== 'string') {
        throw new Error('Invalid product id');
    }
};