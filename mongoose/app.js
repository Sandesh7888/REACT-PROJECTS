const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/testmongoose')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const userModel = require('./usermodel');
const productModel =require('./productmodel');
const carModel =require('./carModel');

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
        
       
    },
    {
        id:2,
        name:"bike"

    })
    res.send(createProduct)

})


app.get('/car',async (req,res)=>{
    const cbike = await carModel.create({
        name:"m1",
        color:"metalic black"
    },{
        name:"m2",
        color:"fiber yellowgreen"
    })

    res.send(cbike);
})
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
