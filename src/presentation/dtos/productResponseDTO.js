class ProductResponseDTO {
    constructor(productEntity) {
        this.id = productEntity.id;
        this.name = productEntity.name;
        this.price = productEntity.price;
        this.provider = productEntity.provider;
        this.description = productEntity.description || "No description provided";
        this.status = productEntity.quantity > 0 ? "In Stock" : "Out of Stock";
        Object.freeze(this);
    }
}

export default ProductResponseDTO;