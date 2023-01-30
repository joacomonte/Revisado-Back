const express = require('express');
const productsRouter = express.Router();
const notAuthRouter = express.Router();

const {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getYourProducts
} = require('../controllers/products.js');


productsRouter.route('/').get(getYourProducts).post(createProduct)
productsRouter.get('/:id', getSingleProduct).patch('/:id', updateProduct).delete('/:id', deleteProduct)

notAuthRouter.route('/').get(getAllProducts)
notAuthRouter.get('/:id', getSingleProduct)


module.exports = { productsRouter, notAuthRouter };