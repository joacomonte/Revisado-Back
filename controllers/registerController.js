const { Users } = require('../models/users');
const { StatusCodes } = require('http-status-codes')

// const  { BadRequestError, UnauthenticatedError }  = require('../errors/indexError')
// const CustomErrorApi = require('../errors/CustomErrorApi');

const register = async (req, res) => {
  const user  = await Users.create({...req.body});
  const token = user.createJWT();
  const cookieToken = user.createJWT("1d")
  res
    .status(StatusCodes.CREATED)
    .cookie('token',  cookieToken, { httpOnly : true, credentials: true})
    .json({ user: user.name, token : token, cookieToken : cookieToken })
}


module.exports = {
  register,
}