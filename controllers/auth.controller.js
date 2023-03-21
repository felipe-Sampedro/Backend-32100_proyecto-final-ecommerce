const { generateToken } = require("../middlewares/jwt.middleware");
const UsersDao = require('../models/daos/users/users.mongo.dao');
const { successResponse, HttpError } = require("../utils/api.utils");

const UsersModel = new UsersDao();  
const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password)

const register= async (req, res, next)=> {
    try {
        const { username, password, email } = req.body;
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
        if (!isValidPassword(user,pass)) {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST,"wronf email or password")
        }

        const baseUser ={
            email: user.email,
            username: user.username,
            visits: user.visits
        }
        const token = generateToken(baseUser);
        return res.json(successResponse({access_token:token}))


        } catch (error) {
            next(error)
        }
}


module.exports = {
    register,
    login
}