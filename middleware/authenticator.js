const { Users } = require('../models/users');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/indexError')

const auth = async(req,res, next) => {
//check header
const authHeader = req.headers.authorization;

if(!authHeader || !authHeader.startsWith('Bearer')){
    throw new UnauthenticatedError('Authentication Invalid')
}

//saltea el "bearer"
const token = authHeader.split(' ')[1] 

try{
    const payload = jwt.verify(token,'jwtSecret') //process.env.JWT_SECRET ;
    req.user = { userID : payload.userID, name: payload.name};
    next()
}catch(err){
  throw new UnauthenticatedError('Authentication invalid')
}

}


module.exports = auth