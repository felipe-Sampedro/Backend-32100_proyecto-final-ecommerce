const express = require('express');
const UsersControllers = require('../../controllers/users.controller');
const { jwtAuth } = require('../../middlewares/jwt.middleware');
const usersCont = new UsersControllers();

const router = express.Router();

router.post('/data',jwtAuth,usersCont.getUsers)

module.exports = router;