const express = require('express');
const router = express.Router();
const notAuthRouter = express.Router();

const {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/products.js');


router.route('/').get(getAllProducts).post(createProduct)
router.get('/:id', getSingleProduct).patch('/:id',updateProduct).delete('/:id',deleteProduct)

notAuthRouter.route('/').get(getAllProducts)
notAuthRouter.get('/:id', getSingleProduct)


module.exports = { router, notAuthRouter };