const express = require('express');
const router = express.Router();

const {
    getProducts,
    createProduct,
    createProductPostman,
    updateProduct,
    deleteProduct,
} = require('../controllers/products.js');


router.get('/', getProducts)
      .post('/',createProduct)
      .patch('/',updateProduct)



module.exports = router;