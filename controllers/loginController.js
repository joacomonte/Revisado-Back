const { Users } = require('../models/users');

const  { errorBadRequest, errorUnauthenticated }  = require('../errors/indexError')

// const { StatusCodes } = require('http-status-codes')
// const CustomErrorApi = require('../errors/CustomErrorApi');


const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    throw new errorBadRequest("no se introdujo mail o password")
  }
  //check user
  const user = await Users.findOne({ email })
  if(!user){ 
    throw new errorUnauthenticated('no se encontro el usuario por email')
  }

  // compare password
  const passwordCorrect = await user.comparePassword(password)
  if(!passwordCorrect){ 
    throw new errorUnauthenticated('se comparo la contraseña y no es correcta')
  }
  const token = user.createJWT();
  const cookieToken = user.createJWT("1d")
  res.status(200)
    .cookie('token',  cookieToken, { httpOnly : true, credentials: true})
    .json({ user: user.name, token : token, cookieToken : cookieToken })
}



module.exports = {
  login,
}