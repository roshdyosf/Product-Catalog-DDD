import { validateProduct } from "../services/productValidator.js";

class Product {
    constructor(id, name, price, provider, description, quantity) {
        validateProduct({ id, name, price, provider, description, quantity });
        this.id = id;
        this.name = name;
        this.price = price;
        this.provider = provider;
        this.description = description;
        this.quantity = quantity;
    }
}

export default Product;