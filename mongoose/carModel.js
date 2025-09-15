const mongoose = require('mongoose');

const carSchema= mongoose.Schema({
    name:String,
    color:String

})

module.exports = mongoose.model("car",carSchema);