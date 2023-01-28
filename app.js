require('express-async-errors')
require("dotenv").config();
const express = require('express')
const connectDB = require('./db/connect')
const cors = require('cors');
const cookieParser = require('cookie-parser');
// controllers
const auth = require('./middleware/authenticator')
const  userLogin = require('./routes/userLogin')
const { notAuthRouter,  productsRouter } = require('./routes/productsTasks')

const app = express()

app.use(express.json())

app.use(cors({
   credentials: true,
   origin: true,
}))

app.use(cookieParser());

app.use((req, res, next) => {
   res.cookie("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2QyZjgxY2EyNTk5YTM1Yjg2ZmNmNzgiLCJuYW1lIjoiam9hY28iLCJpYXQiOjE2NzQ4NjUxNjMsImV4cCI6MTY3NDk1MTU2M30.oyMWQvMHUUUwKxBPhfVxqjgashSGDI93v2CkpQMPn60", {
     sameSite: "lax",
     secure: false,
     httpOnly: true,
     maxAge: 60 * 60 * 24 * 7
   });
   next();
 });


const notFound = require('./middleware/not-found')
const errorHanddler = require('./middleware/errorHanddler')

// routes
app.get('/', (req, res) => { res.send('Revisado BACK END') })
app.use('/api/products/all', notAuthRouter );
app.use('/api/auth', userLogin);
app.use('/api/products', auth,  productsRouter);

app.use(notFound);
app.use(errorHanddler)

// api start
const port = process.env.PORT || 3001;
const start = async () => { 
 try{ 
    await connectDB("mongodb+srv://revisado:playstation2@cluster0.dlopt2u.mongodb.net/RevisadoTest?retryWrites=true&w=majority")
    app.listen(port, () => { console.log(`Revisado listening on port ${port}`)})
 } catch(err){
    console.log(err)
 }  
}

start();

