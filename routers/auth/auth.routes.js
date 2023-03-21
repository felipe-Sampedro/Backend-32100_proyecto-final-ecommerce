const express = require('express'); 
const authController = require('../../controllers/auth.controller');
const { jwtAuth } = require('../../middlewares/jwt.middleware');

const router = express.Router();


router.post('/register',authController.register)

router.post('/login', authController.login)

module.exports = router;