// app/models/user.js
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({  
        time         : String,  
        day          : String, 
        speed        : Number,
        status       : String
              
});
module.exports = mongoose.model('speedMotor_3', userSchema);