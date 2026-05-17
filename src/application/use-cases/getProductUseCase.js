import Product from "../../domain/entities/product.js";

class GetProductUseCase {

    constructor({ productRepository } = {}) {
        this.productRepository = productRepository;
    }

    async execute(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new Error('ID miss match. Product not found');
        }
        return product;
    }
}

export default GetProductUseCase;