const CustomErrorApi = require('../errors/CustomErrorApi');
const { Users } = require('../models/users');
const { StatusCodes } = require('http-status-codes')
const  { BadRequestError, UnauthenticatedError }  = require('../errors/indexError')


const register = async (req, res) => {
  const user  = await Users.create({...req.body});
  const token =  user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: {name : user.name}, token })
}

const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    throw new BadRequestError("Pls provie username and password")
  }
  //check user
  const user = await Users.findOne({ email })
  if(!user){ 
    throw new UnauthenticatedError('Invalid credentials')
  }
  // compare password
  const passwordCorrect = await user.comparePassword(password)
  if(!passwordCorrect){ 
    throw new UnauthenticatedError('Invalid password')
  }
  const token = user.createJWT();
  res.status(200).json({ user: {name : user.name}, token })
}



const dashboard = async  (req, res) => {
  const luckyNumber  = Math.floor(Math.random()*100);
  res.status(200).json({msg: `Hello John`, secret: `Here is your authorized data, your r lucky number is ${luckyNumber}`})
  }


module.exports = {
  register,
  login, 
  dashboard,
}