const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
const cors = require('cors'); 

const connectDB = require('./db/connect')
require("dotenv").config();

// midleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Revisado BACK END')
})

// controllers
const products = require('./routes/productsTasks')
app.use('/api/products', products)

// api start
const start = async () => { 
 try{ 
    await connectDB("mongodb+srv://revisado:playstation2@cluster0.dlopt2u.mongodb.net/Revisado?retryWrites=true&w=majority")
    app.listen(port, () => { console.log(`Revisado listening on port ${port}`)})
 } catch(err){
    console.log(err)
 }  
}

start();

