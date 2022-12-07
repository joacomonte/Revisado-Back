const express = require('express')
const app = express()
const port = 3000
const products = require('./routes/productsTasks')
const connectDB = require('./db/connect')


app.get('/', (req, res) => {
  res.send('Revisado BACK END')
})




// routes
app.use('/api/products', products)



const start = async () => { 
 try{ 
    await connectDB()
    app.listen(port, () => { console.log(`Revisado listening on port ${port}`)})
 } catch(err){
    console.log(err)
 }  
}

start();