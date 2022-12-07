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

const productSchema2 = new mongoose.Schema({
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

const Product = mongoose.model('Products', productSchema)
      Product = mongoose.model('Products2', productSchema2)

module.exports = Product;
