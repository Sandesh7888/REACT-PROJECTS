const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/testmongoose')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const userModel = require('./usermodel');
const productModel =require('./productmodel');

app.get('/', (req, res) => {
    res.send('hey');
});

app.get('/create', async (req, res) => {
    const createdUser = await userModel.create({
        name: "sandesh",
        email: "a@gmail.com",
        username: "admin"
    });
    res.send(createdUser);
});

app.get('/product',async(req,res)=>{
    const createProduct= await productModel.create({
        id:1,
        name:"car",
        details:{
            id:1,
            name:"bmw"
        }
       
    })
    res.send(createProduct)

})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
