import Product from "../../domain/entities/product.js";

class ListProductUseCase {
    constructor({ productRepository } = {}) {
        this.productRepository = productRepository;
    }

    async execute(queryParams) {

        const products = await this.productRepository.findAll(queryParams);

        return products;
    }
}

export default ListProductUseCase;