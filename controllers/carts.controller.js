const { HTTP_STATUS } = require('../constants/api.constants');

const { CartsDao } = require('../models/daos/app.daos');
const { successResponse } = require('../utils/api.utils');


const cartsDao= new CartsDao()

class CartsControllers{

    createCart = async (req, res, next) => {
        try{
          const newCart = await cartsDao.saveCart(); 
          const response = successResponse(newCart);
          res.status(HTTP_STATUS.CREATED).json(response);
        }
        catch(error){
          next(error);
        }   
      };  
    
      deleteCart = async (req, res, next) => {
        const { id } =  req.params;
        try{
          const delCart = await cartsDao.delete(id);
          const response = successResponse(delCart);
          res.status(HTTP_STATUS.CREATED).json(response);
        }
        catch(error){
          next(error);
        }  
      };
    
      listCartProds = async (req, res,next) => { 
      const { id } =  req.params;
        try {
          const products = await cartsDao.getCartProds(id)
          const response = successResponse(products)
          res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
        next(error);
        }     
      };
    
      addProds = async (req, res, next) => {
        const { idCar, idProd } =  req.params;    
        try {
          const products = await cartsDao.addProductToCart(idCar, idProd)
          const response = successResponse(products)
          res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
        next(error);
        }     
      }
    
      deleteProductCart = async (req , res, next) => {
        const { idCar,idProd } =  req.params;
        try {
          const products = await cartsDao.removeProductFromCart(idCar, idProd)
          const response = successResponse(products)
          res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
        next(error);
        }     
     }
     
    }

module.exports = CartsControllers;