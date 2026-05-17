import ProductRepository from "../../domain/repositories/productRepository.js";
import Product from "../../domain/entities/product.js";
class MongoProductRepository extends ProductRepository {
    constructor(productModel) {
        super();
        this.productModel = productModel;
    }

    async save(productEntity) {
        const productDoc = new this.productModel({
            _id: productEntity.id,
            name: productEntity.name,
            price: productEntity.price,
            provider: productEntity.provider,
            description: productEntity.description,
            quantity: productEntity.quantity
        });

        return await productDoc.save();
    }


    async findById(id) {
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return new Product(
            product._id,
            product.name,
            product.price,
            product.provider,
            product.description,
            product.quantity);

    }

    async findAll(filters = {}) {

        if (filters.name) {
            filters.name = { $regex: filters.name, $options: 'i' };
        }
        if (filters.provider) {
            filters.provider = { $regex: filters.provider, $options: 'i' };
        }

        const products = await this.productModel.find(filters);

        return products.map(product => new Product(
            product._id,
            product.name,
            product.price,
            product.provider,
            product.description,
            product.quantity
        ));

    }
}
export default MongoProductRepository;