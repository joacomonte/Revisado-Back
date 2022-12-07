const mongoose = require('mongoose');

const connectionString = "mongodb+srv://revisado:playstation2@cluster0.dlopt2u.mongodb.net/Products?retryWrites=true&w=majority"

const connectDB = ()=> {
    return mongoose
        .set('strictQuery', true) // This option controls how Mongoose handles unrecognized query parameters in MongoDB queries.
        .connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}) 
        .then(()=> {console.log("CONNECTED TO THE DB")})
        .catch((err)=> console.log(err))
}

module.exports = connectDB;