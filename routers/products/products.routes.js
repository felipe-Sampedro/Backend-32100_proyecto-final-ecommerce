const express = require('express');
const ProductsController = require('../../controllers/products.controller');
const productsCont = new ProductsController();

const router = express.Router();

router.get('/', productsCont.getProducts);
router.get('/:id', productsCont.getProductsById);
router.post('/', productsCont.saveProduct);
router.put('/:id', productsCont.updateProductsById);
router.delete('/:id', productsCont.deleteProductsById);

module.exports = router;