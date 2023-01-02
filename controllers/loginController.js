const { Users } = require('../models/users');

const  { BadRequestError, UnauthenticatedError }  = require('../errors/indexError')

// const { StatusCodes } = require('http-status-codes')
// const CustomErrorApi = require('../errors/CustomErrorApi');


const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    throw new BadRequestError("no se introdujo mail o password")
  }

  
  //check user
  const user = await Users.findOne({ email })
  if(!user){ 
    throw new UnauthenticatedError('no se encontro el usuario por email')
  }


  // compare password
  const passwordCorrect = await user.comparePassword(password)
  if(!passwordCorrect){ 
    throw new UnauthenticatedError('se comparo la contraseña y no es correcta')
  }
  const token = user.createJWT();
  res.status(200).json({ user: {name : user.name}, token })
}



module.exports = {
  login,
}