const { Users } = require('../models/users');
const { StatusCodes } = require('http-status-codes')

// const  { BadRequestError, UnauthenticatedError }  = require('../errors/indexError')
// const CustomErrorApi = require('../errors/CustomErrorApi');

const register = async (req, res) => {
  const user  = await Users.create({...req.body});
  const token =  user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: {name : user.name}, token })
}


module.exports = {
  register,
}