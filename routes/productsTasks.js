const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/products.js');


router.get('/', getAllProducts)
      .post('/',createProduct)

      
router.get('/:id', getSingleProduct).patch('/:id',updateProduct).delete('/:id',deleteProduct)



module.exports = router;