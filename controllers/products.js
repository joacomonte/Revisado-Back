const {Products} = require("../models/productModel")


const createProduct = async (req,res) => {
    try
    { 
        const task = await Products.create(req.body)
        res.status(201).json(task)
    } 
    catch (err) {res.status(500).json({msg: err}) }
}      

const getProducts = async (req, res) => {
    try
    { 
        const task = await Products.find({})
        res.status(200).json({task})
    } 
    catch (err) {res.status(500).json({msg: err}) }
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