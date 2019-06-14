var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        year: Number,
        month: Number,
        day: Number,
        power: Number,  
        fullyear: String    
    }

);
module.exports = mongoose.model('solarPowerRemain_2', userSchema);