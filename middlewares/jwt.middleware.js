const jwt = require('jsonwebtoken');
const envConfig = require('../env.config')
const { HTTP_STATUS } = require('../constants/api.constants')
const { errorResponse } = require('../utils/api.utils')

const generateToken = (data)=>{
    const token = jwt.sign(data,envConfig.JWT_SECRET, { expiresIn: 600 });
    return token;
}

// const jwtAuth = (req, res, next) => {
//     const authHeather =req.headers.authorization;
//     console.log(authHeather);
//     if (!authHeather) {
//         return res.status(HTTP_STATUS.NOT_AUTHORIZED).json(errorResponse('User is not authenticated'))
//     }
//     const token = authHeather.split(' ')[1];
//     jwt.verify(token,envConfig.SESSION_SECRET,(error,decoded)=>{
//         if (error){
//             return res.status(HTTP_STATUS.NOT_AUTHORIZED).json(errorResponse('User is not authenticated'))
//         } else {
//             req.user = decoded.data;
//             next();
//         }
//     })
// }

const jwtAuth = async (req, res, next) => {
    let token
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
  
    if (!token) {
      return res.status(HTTP_STATUS.NOT_AUTHORIZED).json(errorResponse('User is not authenticated'))
    }
  
    try {
      // Verify token
      const decoded = jwt.verify(token, envConfig.JWT_SECRET)
  
      const user = await getUser(decoded.id)
  
      if (!user) {
        return res.status(HTTP_STATUS.NOT_AUTHORIZED).json(errorResponse('User is not authenticated'))
      }
  
      next()
    } catch (error) {
      return res.status(HTTP_STATUS.NOT_AUTHORIZED).json(errorResponse('User is not authenticated'))
    }
  }
  


module.exports = {
    generateToken,
    jwtAuth
}