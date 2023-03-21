const express = require('express');
const ProductsController = require('../../controllers/products.controller');
const productsCont = new ProductsController();

const router = express.Router();

router.get('/', productsCont.getProducts);
router.get('/:Id', productsCont.getProductsById);
router.post('/', productsCont.saveProduct);
router.put('/:Id', productsCont.updateProductsById);
router.delete('/:Id', productsCont.deleteProductsById);

module.exports = router;