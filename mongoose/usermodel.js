const mongoose = requrie('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/testmongoose`);

const userSchema =mongoose.Schema({
    name:String,
    username:String,
    email:String

})

mongoose.madel("user","userSchema");