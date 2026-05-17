import { catchAsync } from "../utils/catchAsync.js";
import ProductResponseDTO from "../dtos/productResponseDTO.js";
import CreateProductDTO from "../dtos/createProductDTO.js";
class ProductController {
    constructor({ createProductUseCase, getProductUseCase, listProductsUseCase } = {}) {
        this.createProductUseCase = createProductUseCase;
        this.getProductUseCase = getProductUseCase;
        this.listProductsUseCase = listProductsUseCase;
    }
    createProduct = catchAsync(async (req, res, next) => {
        const productData = new CreateProductDTO(req.body);
        const createdProduct = await this.createProductUseCase.execute(productData);
        res.status(201).json({
            status: 'success',
            data: { product: new ProductResponseDTO(createdProduct) }
        });
    });

    getProduct = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const product = await this.getProductUseCase.execute(id);
        res.status(200).json({
            status: 'success',
            data: { product: new ProductResponseDTO(product) }
        });
    });


    listProducts = catchAsync(async (req, res, next) => {
        const { page = 1, limit = 10 } = req.query;
        const products = await this.listProductsUseCase.execute({ page, limit });
        const productsRes = products.map(product => new ProductResponseDTO(product));
        res.status(200).json({
            status: 'success',
            data: { products: productsRes }
        });
    });

}

export default ProductController;