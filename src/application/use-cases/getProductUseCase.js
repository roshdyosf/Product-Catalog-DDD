import Product from "../../domain/entities/product.js";
import AppError from "../../presentation/utils/AppError.js";
class GetProductUseCase {

    constructor({ productRepository } = {}) {
        this.productRepository = productRepository;
    }

    async execute(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new AppError('Product not found with this ID', 404);
        }
        return product;
    }
}

export default GetProductUseCase;