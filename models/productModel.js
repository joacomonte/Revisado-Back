const mongoose = require('mongoose');

// Create a product schema
const productSchema = new mongoose.Schema({
    nameDisplay: String,
    brand: String,
    model: String,
    price: Number,
});
const Product = mongoose.model('Product', productSchema)


module.exports = Product;
