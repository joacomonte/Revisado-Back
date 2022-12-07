const Product = require("../models/productModel")


<<<<<<< Updated upstream
const createProduct = (req,res) => {
    const product = new Product(
        {
            model:req.body.model,
            color:req.body.color
        }
    )
    product.save()
        .then(data => {res.json(data)})
=======
const createProduct = async (req,res) => {
    try
    { 
        const task = await Product.create(req.body)
        
        res.status(201).json(task)
    } 
    catch (err) {console.log(err) }
>>>>>>> Stashed changes
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