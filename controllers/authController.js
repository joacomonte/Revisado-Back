const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Users } = require('../models/users');
const  { BadRequestError, errorUnauthenticated }  = require('../errors/indexError');
const { use } = require('express/lib/router');


const ACCESS_TOKEN_SECRET='secretaccess'
const REFRESH_TOKEN_SECRET='secretrefresh'

const loginHandleFunction = async (req,res) => {

    const { email, password } = req.body;
    if(!email || !password){
        throw new BadRequestError("no se introdujo mail o password")
    }


    //check user
    const user = await Users.findOne({ email })
    if(!user){ 
        throw new errorUnauthenticated('no se encontro el usuario por email')
    }

    // compare password
//     const passwordCorrect = await user.comparePassword(password)
//         if(!passwordCorrect){ 
//     throw new errorUnauthenticated('se comparo la contraseña y no es correcta')
//   }

//   console.log(passwordCorrect)

    const match = await bcrypt.compareSync(password, user.password)

    console.log(password)
    console.log(user.password)



    if(!match){
        throw new errorUnauthenticated('se comparo la contraseña y no es correcta')
    }

    //create token
    const accessToken = jwt.sign(
        {
            "email":user.email,
        },
        ACCESS_TOKEN_SECRET,{ expiresIn: '30s' }
    )

    const refreshToken = jwt.sign(
        {"name": user.name},
        
        REFRESH_TOKEN_SECRET,
        // process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    )

    //saving refreshToken with current user
    const tempUser = await Users.findOneAndUpdate(
        {email},
        {refreshToken:refreshToken}
    ) 
    


    res.cookie('jwt', refreshToken, 
    {
        httpOnly: true, 
        sameSite:'None',
        secure: true
    });
    res.json({accessToken})

}

module.exports = { loginHandleFunction };