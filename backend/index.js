const express = require("express");
require("./db/Config");
const User = require("./db/User");
const Product = require('./db/Product')
const cors = require("cors");
const app = express();
const mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectID;

app.use(express.json());
app.use(cors()); // middleware

app.post("/register", async (req, res) => {
  let user = new User(req.body); // user me jo bhi body me req kiye h wo daal rhe h
  let result = await user.save(); // jo bhi daale h usko save kr rhe h
  result = result.toObject() // yeh result ko object me change kr dia. yaha select use nh kiye qki upar hm data save kr rhe h 
  delete result.password // yaha password to delete kr diye jb response jayega node me to
  res.send(result); // postman se data send kr rhe h node ko

});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password"); // yaha login me hmko search krna h to isilye khi save use nh kr rhe. select me - use kie to jo response aayeha backend me wo nh rhega
    if (user) {
      res.send(user);
    } else {
      // res.send("user is not valid") // response me direct string nh bhej skte error dega "Uncaught (in promise) SyntaxError: Unexpected token 'U', "User is not valid" is not valid JSON"
      res.send({ result: "user is not valid"}); // response me hmesa object banake ke bhejo error hi q na ho
    }
  } else {
    res.send({result: "User is not valid"});
  }
});

app.post('/add-product', async(req,res) => {
  let product = new Product(req.body)
  let result = await product.save()
  res.send(result)
})

app.get('/products', async (req,res) => {
  let products = await Product.find()
  if(products.length>0){
    res.send(products)
  }else{
    res.send({result: "No Products Found"})
  }
})

app.delete("/product/:id", async (req, resp) => {
  // console.log(req.params.id);
  let result = await Product.findByIdAndRemove(req.params.id);
  resp.send(result)
})


app.listen(5000, () => {
  console.log("Backend is connected...");
});
