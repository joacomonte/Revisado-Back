const mongoose = require('mongoose');

// Create a product schema
const productSchema = new mongoose.Schema(
    {
    model:
        {
            type: String,
            require:false
        },
    color:
        {
            type: String,
            require:false
        }
    }
)
const Product = mongoose.model('Product', productSchema)


module.exports = Product;
