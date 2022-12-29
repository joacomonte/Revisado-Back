const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersSchema = new mongoose.Schema({
    name : {                 
        type : String, 
        required: [true, "must have name"],
        maxlength: [20, "name cant have more than 20 caracters"],
        minlength: [2, "Must have more than 2 letters"],
    },
    email : {                 
        type : String, 
        required: [true, "must have name"],
        match : [ /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please provide valid email"],
        unique: true,
    },
    password : {                 
        type : String, 
        required: [true, "must have name"],
        maxlength: [20, "name cant have more than 20 caracters"],
        minlength: [2, "Must have more than 2 letters"],
    },
});

usersSchema.pre('save', async function(){
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt)

})

usersSchema.methods.createJWT = function() {
return jwt.sign( {userID : this._id, name : this.name }, 'jwtSecret', {expiresIn : '30d'} )
}                                                         //procces.env.jwtsecret //procces.env.lifetime

usersSchema.methods.comparePassword = async function(posiblePassword) {
 const isMatch = await bcrypt.compare(posiblePassword, this.password);
 return isMatch
}    


const Users = mongoose.model('Users', usersSchema)

module.exports = { Users };