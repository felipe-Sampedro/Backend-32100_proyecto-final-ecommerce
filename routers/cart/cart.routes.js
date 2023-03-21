const express = require('express');
const CartsController = require('../../controllers/carts.controller');
const cartCont = new CartsController();

const router = express.Router();

router.post('/', cartCont.createCart);
router.delete('/:id', cartCont.deleteCart);
router.get('/:id/products', cartCont.listCartProds);
router.post('/:idCar/:idProd', cartCont.addProds);
router.delete('/:IdCar/:IdProd', cartCont.deleteProductCart);


module.exports = router;