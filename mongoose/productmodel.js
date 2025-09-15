const mongoose =require('mongoose');

const productSchema = mongoose.Schema({
    name:String,
    id:Number,
    // details:{
    //     id:Number,
    //     name:String,
    //     availabe:true
    // }
})

module.exports =mongoose.model("product",productSchema);