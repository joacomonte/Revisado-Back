const {Products} = require("../models/productModel")


const createProduct = async (req,res) => { // post
    try
    {   const task = await Products.create(req.body)
        res.status(201).json(task)
    } 
    catch (err) {res.status(500).json({msg: err}) }
}      

const getAllProducts = async (req, res) => {
    try{ 
        setTimeout(async () => {
            const task = await Products.find();
            res.status(200).json(task)},10)
    } 
    catch (err) {res.status(500).json({msg: err}) }
}

const getSingleProduct = async (req, res) => { 
    try{
        const id = req.params;
        const task = await Products.findOne(id)
        if(!task){
            return res.status(404).json({msg:`No product with this ID:${id}`})
        }
        res.status(200).json(task)
    } 
    catch (err) {res.status(500).json({msg: err}) }
}


const deleteProduct= async (req, res) => {
    try{
        const { id: taskID } = req.params;
        const task = await Products.findOneAndDelete({_id: taskID})
        if(!task){
            return res.status(404).json({msg:`No product with this ID:${taskID}`})
        }
        res.status(200).json(task)
    } 
    catch (err) {res.status(500).json({msg: err}) }
} 

const updateProduct = async (req, res) => { // patch
    try{
        const { id: taskID } = req.params;
        const task = await Products.findOneAndUpdate({_id: taskID}, req.body, {
            new: true, // devuelve el valor updateado
            runValidators: true // checkea schema
        });
        //
        if(!task){
            return res.status(404).json({msg:`No product with this ID:${taskID}`})
        };
        res.status(200).json(task)
    } 
    catch (err) {res.status(500).json({msg: err}) }
}

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}

