const mongoose = require('mongoose');

// Create a product schema
const productSchema = new mongoose.Schema({
    idProduct : {                 
        type : Number, 
        required: [false, "must have idProduct"],
        trim: true,
    },
    brand : {                 
        type : String, 
        required: [false, "must have brand"],
        trim: true,
        maxlength: [20, "brand cant have more than 20 caracters"]
    },
    modelName : {                 
        type : String, 
        required: [false, "must have modelName"],
        trim: true,
        maxlength: [20, "modelName cant have more than 20 caracters"]
    },
    modelNumber : {                 
        type : String, 
        required: [false, "must have  modelNumber"],
        trim: true,
        maxlength: [30, "modelNumber cant have more than 20 caracters"]
    },
    caracts : {                 
        type : String, 
        required: [false, "must have caracts"],
        trim: true,
        maxlength: [30, "caracts  cant have more than 20 caracters"]
    },
    nameToDisplay : {                 
        type : String, 
        required: [false, "must have nameToDisplay"],
        trim: true,
        maxlength: [30, "nameToDisplay cant have more than 20 caracters"]
    },
    price : {                 
        type : Number, 
        required: [false, "must have  price "],
        trim: true,
        maxlength: [30, "price cant have more than 20 caracters"]
    },
    color : {                 
        type : String, 
        required: [false, "must have color"],
        trim: true,
        maxlength: [30, "spects cant have more than 20 caracters"]
    },
    details : {                 
        type : String, 
        required: [false, "must have details"],
        trim: true,
        maxlength: [30, "spects cant have more than 20 caracters"]
    },
});

const usersSchema = new mongoose.Schema({
    nameDisplay : {                 
        type : String, 
        required: [true, "must have nameDisplay"],
        maxlength: [20, "name cant have more than 20 caracters"]
    },
    brand: String,
    model: String,
    price: Number,
});

//chau

const Products = mongoose.model('Products', productSchema)
const User = mongoose.model('Users', usersSchema)

module.exports = {Products, User};
