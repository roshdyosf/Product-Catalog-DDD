import { randomUUID } from 'crypto';

import Product from "../../domain/entities/product.js";
import { publishProductCreatedEvent } from '../../infrastructure/messaging/kafkaProducer.js';
class CreateProductUseCase {
    constructor({ productRepository } = {}) {
        this.productRepository = productRepository;
    }

    async execute(productDTO) {
        const { name, price, provider, description, quantity } = productDTO;
        const id = randomUUID();
        const product = new Product(id, name, price, provider, description, quantity);
        await publishProductCreatedEvent(product);
        return this.productRepository.save(product);
    }
}

export default CreateProductUseCase;