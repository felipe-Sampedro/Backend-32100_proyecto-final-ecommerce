const { HTTP_STATUS } = require("../constants/api.constants");
const UsersDao = require("../models/daos/users/users.mongo.dao");
const { successResponse } = require("../utils/api.utils");

const UsersModel = new UsersDao();

const getUsers = async (req, res, next) => {
    try {
      const user = await UsersModel.getUsers(req.user.username);
      user.visits++;
      await UsersModel.update(user._id,user)
      return res.json(successResponse(user))
    } catch (error) {
      // console.log(error);
      next(error);
    }
  };

module.exports = {
  getUsers
};
