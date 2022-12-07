const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const products = require('./routes/productsTasks')
const connectDB = require('./db/connect')
require("dotenv").config();

app.use(express.json());


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


// const mongoose = require('mongoose');
// require('dotenv').config();

// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;
// const dbHost = process.env.DB_HOST;
// const dbName = process.env.DB_NAME;

// const connectionString = `mongodb://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;

// mongoose.connect(connectionString, { useNewUrlParser: true });