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

    //checker email and pass
    if(!email || !password){throw new BadRequestError("no se introdujo mail o password")}

    //checker in db
    const user = await Users.findOne({ email })
    if(!user){ throw new errorUnauthenticated('no se encontro el usuario por email')}

    const match = await bcrypt.compare(password, user.password);

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