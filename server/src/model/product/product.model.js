import mongoose from "mongoose";
const productScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    negotiable: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productAge:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const Product = mongoose.model('Product', productScehma);

export default Product;