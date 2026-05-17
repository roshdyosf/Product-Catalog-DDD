import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    provider: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const ProductsModel = mongoose.model('Product', productSchema);
export default ProductsModel;