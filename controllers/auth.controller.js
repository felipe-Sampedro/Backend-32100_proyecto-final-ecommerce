const { generateToken } = require("../middlewares/jwt.middleware");
const UsersDao = require('../models/daos/users/users.mongo.dao');
const { successResponse, HttpError } = require("../utils/api.utils");
const bcrypt = require('bcrypt')

const UsersModel = new UsersDao();  
const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password)

const register= async (req, res, next)=> {
    try {
        const { username, email, password} = req.body;
        const baseUser = {
          username,
          email,
          visits:0
        };
        const userBD ={
          ...baseUser,
          password: createHash(password)
        };
        await UsersModel.createUser(userBD);
        const token = generateToken(baseUser);
        return res.json({ access_token: token });
      } catch (error) {
          next(error)
      }
}


const login= async (req, res, next)=> {
    try {
        const { email, password } = req.body;
        const user = await UsersModel.getByEmail(email);
        console.log('usuario ',user);
        console.log('usuario y password validos ', isValidPassword(user,password));
        if (!isValidPassword(user,password)) {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST," wrong email or password")
        }

        const baseUser ={
            username: user.username,
            email: user.email,
            visits: user.visits
        }
        console.log('el base user es: ', baseUser);
        const token = generateToken(baseUser);
        console.log('el token es ', token);
        return res.json(successResponse({access_token:token}))


        } catch (error) {
            next(error)
        }
}


module.exports = {
    register,
    login
}