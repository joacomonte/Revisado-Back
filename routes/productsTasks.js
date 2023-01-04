const express = require('express');
const productsRouter = express.Router();
const allProductsRouter = express.Router();

const {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getYourProducts
} = require('../controllers/products.js');


productsRouter.route('/').get(getYourProducts).post(createProduct)
productsRouter.get('/:id', getSingleProduct).patch('/:id',updateProduct).delete('/:id',deleteProduct)

allProductsRouter.route('/').get(getAllProducts)
allProductsRouter.get('/:id', getSingleProduct)


module.exports = {  productsRouter, allProductsRouter };