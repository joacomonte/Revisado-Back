const { Users } = require('../models/users');
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt');

// const  { BadRequestError, UnauthenticatedError }  = require('../errors/indexError')
// const CustomErrorApi = require('../errors/CustomErrorApi');

const registerHandleFunction = async (req, res) => 
{
  
  //destructing
  const {name,email,password}  = req.body;

  //checker
  console.log(req.body.name)
  if (!email || !password) return res.status(400).json({ 'message': 'no email or pwd found in input' });

  //checkear si ya existe el usuario, return error 409
  //...

  try
  {
    // encrypt pwd
    // const hashedPwd = await bcrypt.hash(password,10);

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt)

    //Store new user that looks like
    // _id: 
    // name: 
    // email:
    // password

    // const newUser = await Users.create({...req.body});

    const newUser = 
      {
        "name":name,
        "email":email,
        "password":hashedPwd,
      }

    const setNewUser = await Users.create(newUser)

    res.status(StatusCodes.CREATED).json({ "success": `new user ${name} created!` })
    // const token =  email.createJWT();
  } 
  catch (err) {res.status(500).json({ 'message': err.message });

  }
}

module.exports = {registerHandleFunction};