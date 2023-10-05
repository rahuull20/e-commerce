const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require("./db/user");//user js import
const Product = require('./db/Product');
const app = express();
const mongodb = require('mongodb')
const Jwt =require('jsonwebtoken');
const jwtKey= 'e-comm';


app.use(express.json());
app.use(cors());//to resolve cors issue

app.post("/signup", async (req, resp) => {
    //saves requested data in db
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();//not give password in console
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: 'something went wrong please try again later' })
        }
        resp.send({ result, auth: token })
    })
})

//login api
app.post("/login", async (req, resp) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {//if these both paramentes are entered then only fetch data from db
        let user = await User.findOne(req.body).select("-password");// find values from db that maths requested data without password
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        resp.send({ result: 'something went wrong please try again later' })
                    }
                    resp.send({ user, auth: token })
                })
          
        } else {
            resp.send({ result: 'no user found' })
        }
    }
    else {
        resp.send({ result: 'enter valid email or pass' })
    }

})

//add product api
app.post('/addproduct',verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

//get products api
app.get('/products',verifyToken, async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    }
    else {
        resp.send({ result: 'No Products Found' })
    }
})

//delete api
app.delete("/product/:id",verifyToken, async (req, resp) => {
    const result = await Product.deleteOne({ _id: new mongodb.ObjectId(req.params.id) })//when to dleete through id203
    resp.send(result);
});


//tofetch data from id api path of update api
app.get('/product/:id',verifyToken,async(req,resp)=>{
    const result= await Product.findOne({_id:req.params.id})
    if(result){
        resp.send(result);
    }
    else{
        resp.send({result:'no record found'});
    }
})

//update api
app.put('/product/:id',verifyToken,async(req,resp)=>{
    let result= await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result);
});

//search api
app.get('/search/:key', verifyToken,async(req,resp)=>{
    let result= await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            //search in the feild of name i=which is passed in url
            {company:{$regex:req.params.key}}
        ]
    })
    resp.send(result);
})

//to verify token making middleware
function verifyToken(req, resp,next){
    let token= req.headers['authorization']
    if(token){
        token= token.split(' ')[1];//split req data into array whrer spaces there
        //fetch the token only
        Jwt.verify(token,jwtKey, (err,valid)=>{
        if(err){
            resp.send({result:"please provide valid token"})
        }else{
            next();
        }
        })
    }else{
resp.status(403).send({result:"please add token with header"})
    }
   
}
app.listen(5000);