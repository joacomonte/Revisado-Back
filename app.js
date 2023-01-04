require('express-async-errors')
require("dotenv").config();
const express = require('express')
const connectDB = require('./db/connect')
const auth = require('./middleware/authenticator')
const verifyAuth = require('./middleware/verifyJWT.js')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors())

// controllers
// const  userLogin = require('./routes/userLogin')
const { allProductsRouter,  productsRouter } = require('./routes/productsTasks')

// errors
const notFound = require('./middleware/not-found')
const errorHanddler = require('./middleware/errorHanddler');
const { verify } = require('jsonwebtoken');



// routes
app.get('/', (req, res) => { res.send('Revisado BACK END') })
app.use('/api/products/all', allProductsRouter );
// app.use('/api/auth', userLogin);
app.use('/api/products', auth, productsRouter);
app.use('/register',require('./routes/registerRoute'))
app.use('/auth', require('./routes/authRoute'))





//mont


// app.use(verifyJWT);

app.use(notFound);
app.use(errorHanddler)

// api start
const port = process.env.PORT || 3001;
const start = async () => { 
 try{ 
    await connectDB("mongodb+srv://revisado:playstation2@cluster0.dlopt2u.mongodb.net/Revisado?retryWrites=true&w=majority")
    app.listen(port, () => { console.log(`Revisado listening on port ${port}`)})
 } catch(err){
    console.log(err)
 }  
}
//
start();



