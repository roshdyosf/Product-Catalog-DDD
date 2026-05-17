import Product from "../../domain/entities/product.js";

class ListProductUseCase {
    constructor({ productRepository } = {}) {
        this.productRepository = productRepository;
    }

    async execute(filters = {}) {
        const products = await this.productRepository.findAll(filters);
        return products;
    }
}

export default ListProductUseCase;