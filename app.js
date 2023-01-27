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

app.use(cors()); 

app.use(cookieParser());


const notFound = require('./middleware/not-found')
const errorHanddler = require('./middleware/errorHanddler')

// routes
app.get('/', (req, res) => { res.send('Revisado BACK END') })
app.use('/api/products/all', notAuthRouter );
app.use('/api/auth', userLogin);
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Credentials", "true");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
app.use('/api/products', auth, productsRouter);

// app.use('/api/products', auth, productsRouter);


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
//
start();

//ss