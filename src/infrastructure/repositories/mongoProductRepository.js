import ProductRepository from "../../domain/repositories/productRepository.js";
import Product from "../../domain/entities/product.js";
import AppError from "../../presentation/utils/AppError.js";
import APIFeatures from "../utils/apiFeatures.js";

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
            throw new AppError('Product not found', 404);
        }
        console.log(product);

        return new Product(
            product._id,
            product.name,
            product.price,
            product.provider,
            product.description,
            product.quantity);

    }

    async findAll(queryOptions = {}) {


        const features = new APIFeatures(this.productModel.find(), queryOptions);

        const products = await features
            .filter()
            .sort()
            .limitFields()
            .paginate().query;


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