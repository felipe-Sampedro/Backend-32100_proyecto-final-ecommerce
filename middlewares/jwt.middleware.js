const jwt = require('jsonwebtoken');
const envConfig = require('../env.config')
const { HTTP_STATUS } = require('../constants/api.constants')
const errorResponse = require('../utils/api.utils')

const generateToken = (data)=>{
    const token = jwt.sign(data,envConfig.SESSION_SECRET,envConfig.JWT_EXPIRE);
    return token;
}

const jwtAuth = (req, res, next) => {
    const authHeather =req.headers.authorization;
    if (!authHeather) {
        return res.status(HTTP_STATUS.NOT_AUTHORIZED).json(errorResponse('User is not authenticated'))
    }
    const token = authHeather.split(' ')[1];
    jwt.verify(token,envConfig.SESSION_SECRET,(error,decoded)=>{
        if (error){
            return res.status(HTTP_STATUS.NOT_AUTHORIZED).json(errorResponse('User is not authenticated'))
        } else {
            req.user = decoded.data;
            next();
        }
    })
}

module.exports = {
    generateToken,
    jwtAuth
}