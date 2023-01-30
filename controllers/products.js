const { Products } = require("../models/productModel")
const asyncWrapper = require('../middleware/asyncWrapper')
const { BadRequestError, NotFoundError } = require('../errors/indexError')
const { StatusCodes } = require('http-status-codes');

const createProduct = async (req, res) => { // post
    req.body.publishBy = req.user.userID;
    const task = await Products.create(req.body)
    res.status(201).json({ task: task, status: "success", id: req.user.userID })
}

const getAllProducts = async (req, res) => {
    const { brand, modelName, sort, fields } = req.query
    const queryObject = {}
    if (sort) {
        queryObject.sort = sort.replace(",", " ");
    }
    if (brand) {
        queryObject.brand = brand;
    }
    if (modelName) {
        queryObject.modelName = { $regex: modelName };
    }
    if (fields) {
        queryObject.fields = fields.replace(",", " ");
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const userID = req?.user?.userID || "Not loggin"

    let products = await Products.find(queryObject)
        .sort(queryObject.sort)
        .select(queryObject.fields)
        .skip(skip)
        .limit(limit)
    res.status(200).json({ products, nbHits: products.length, queryObject, userID: userID })
}


const getSingleProduct = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Products.findOne({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No product with this ID:${id}`, 404))
    }
    res.status(200).json(task)
})


const deleteProduct = async (req, res) => {
    const userID = req?.user?.userID || "Not loggin"
    const objID = req.params.id
    const task = await Products.findOneAndDelete({ _id: objID, publishBy: userID })
    if (!task) {
        throw new BadRequestError(`Invalid product or ${userID}`)
    }
    res.status(200).json({ task: task, id: req.user.name })
}

const updateProduct = asyncWrapper(async (req, res) => { // patch
    const { id: taskID } = req.params;
    const userID = req?.user?.userID || "Not loggin"
    const task = await Products.findOneAndUpdate({ _id: taskID, publishBy: userID }, req.body, {
        new: true, // devuelve el valor updateado            
        runValidators: true // checkea schema
        // overwrite : true // if true cambia solo le que le mandas, ( se usa PUT)
    });
    if (!task) {
        return res.status(404).json({ msg: `No product with this ID:${taskID}` })
    };
    res.status(200).json({ task: task, id: req.user.userID })

})

const getYourProducts = async (req, res) => {
    const task = await Products.find({ publishBy: req.user.userID })
    res.status(200).json({ Products: task, Amount: task.length, id: req.user.userID })
}


module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getYourProducts
}

