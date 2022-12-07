const Product = require("../models/productModel")


const createProduct = async (req,res) => {
    try
    { 
        const task = await Product.create(req.body)
        res.status(201).json(task)
    } 
    catch (err) {console.log(err) }
}      

const getProducts = (req, res) => {
    res.send('get all products')
}

const createProductPostman = (req, res) => {
    res.send("get all products")
}
const updateProduct = (req, res) => {
    res.send("get all products")
}
const deleteProduct= (req, res) => {
    res.send("get all products")
} 

module.exports = {
    getProducts,
    createProduct,
    createProductPostman,
    updateProduct,
    deleteProduct
}