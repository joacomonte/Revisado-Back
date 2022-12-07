const mongoose = require('mongoose');

// Create a product schema
const productSchema = new mongoose.Schema({
    nameDisplay : {                 
        type : String, 
        required: [true, "must have nameDisplay"],
        trim: true,
        maxlength: [20, "name cant have more than 20 caracters"]
    },
    brand: String,
    model: String,
    price: Number,
});
const Product = mongoose.model('Product', productSchema)


module.exports = Product;
