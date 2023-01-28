const { Users } = require('../models/users');
const jwt = require('jsonwebtoken');
const { errorUnauthenticated} = require('../errors/indexError')

const auth = async (req,res, next) => {

  const authCookie = req.cookies.token;

  console.log(authCookie)
  // if(!authHeader || !authHeader.startsWith('Bearer ')){
  //     throw new errorUnauthenticated('Authentication Invalid bad auto')
  // }
 if(!authCookie){
   throw new errorUnauthenticated('Cookie missing')
 }

//saltea el "bearer"
// const token = authHeader.split(' ')[1] 

  try{
    const payload = jwt.verify(authCookie,'jwtSecret')
    //jwt.verify(authCookie,'jwtSecret') //process.env.JWT_SECRET ;
    req.user = { userID : payload.userID, name: payload.name};
    next()
  }catch(err){
  throw new errorUnauthenticated('Authentication invalid')
}

}

//
module.exports = auth