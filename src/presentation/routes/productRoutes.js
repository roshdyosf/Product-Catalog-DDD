import { router } from "express";

import ProductsModel from "../../infrastructure/database/productModel.js";
import MongoProductRepository from "../../infrastructure/repositories/mongoProductRepository.js";

import GetProductUseCase from "../../application/use-cases/getProductUseCase.js";
import CreateProductUseCase from "../../application/use-cases/createProductUseCase.js";
import ListProductsUseCase from "../../application/use-cases/listProductUseCase.js";



