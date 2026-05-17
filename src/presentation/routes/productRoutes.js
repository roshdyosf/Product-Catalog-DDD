import { Router } from "express";

import ProductsModel from "../../infrastructure/database/productModel.js";
import MongoProductRepository from "../../infrastructure/repositories/mongoProductRepository.js";

import GetProductUseCase from "../../application/use-cases/getProductUseCase.js";
import CreateProductUseCase from "../../application/use-cases/createProductUseCase.js";
import ListProductsUseCase from "../../application/use-cases/listProductUseCase.js";

import ProductController from "../controllers/productController.js";
import { productCreateValidator } from "../validators/productValidator.js"
const productRepository = new MongoProductRepository(ProductsModel);



const productRouter = Router();



const createProductUseCase = new CreateProductUseCase({ productRepository });
const getProductUseCase = new GetProductUseCase({ productRepository });
const listProductsUseCase = new ListProductsUseCase({ productRepository });


const productController = new ProductController({
    createProductUseCase,
    getProductUseCase,
    listProductsUseCase
}
);

productRouter.route('/')
    .post(productCreateValidator, (req, res, next) => productController.createProduct(req, res, next))
    .get((req, res, next) => productController.listProducts(req, res, next));

productRouter.route('/:id')
    .get((req, res, next) => productController.getProduct(req, res, next));



export default productRouter;