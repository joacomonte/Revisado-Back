require('express-async-errors')
require("dotenv").config();
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
const connectDB = require('./db/connect')
const auth = require('./middleware/authenticator')
// controllers
const  mainRouter = require('./routes/main')
const {router, notAuthRouter} = require('./routes/productsTasks')

// errors
const notFound = require('./middleware/not-found')
const errorHanddler = require('./middleware/errorHanddler')

app.use(cors())
// routes

app.get('/', (req, res) => { res.send('Revisado BACK END') })
app.use('/api/products/all', notAuthRouter );
app.use('/api/auth', mainRouter);
app.use('/api/products', auth, router);

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


