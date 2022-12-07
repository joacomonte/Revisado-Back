const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const products = require('./routes/productsTasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const cors = require('cors')

app.use(express.json());
app.use(cors())

//hola
app.get('/', (req, res) => {
  res.send('Revisado BACK END')
})


// routes
app.use('/api/products', products)



const start = async () => { 
 try{ 
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => { console.log(`Revisado listening on port ${port}`)})
 } catch(err){
    console.log(err)
 }  
}

start();
