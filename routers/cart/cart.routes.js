const express = require('express');
const CartsController = require('../../controllers/carts.controller');
const cartCont = new CartsController();

const router = express.Router();

router.post('/', cartCont.createCart);
router.delete('./:Id', cartCont.deleteCart);
router.get('/:Id/products', cartCont.listCartProds);
router.post('/:IdCar/:IdProd', cartCont.addProds);
router.delete('/:IdCar/:IdProd', cartCont.deleteProductCart);


module.exports = router;