class CreateProductDTO {
    constructor(name, price, description, provider, quantity) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.provider = provider;
        this.quantity = quantity;
        object.freeze(this);
    }
}

export default CreateProductDTO;