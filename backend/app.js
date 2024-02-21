const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs') ; 
const UserModel =require("../backend/models/UserModel")

dotenv.config();

const app = express();

const PORT = process.env.PORT ;

// middleware
app.use(express.json()) 
app.use(cors()) 

app.get('/' , (req , res) =>{
    res.send('Hello World') ;
})
app.post("/signUp", async(req,res)=>{
    console.log(req.body)
    const {name, passWord, phoneNo}=req.body;
    const newUser=UserModel({name, passWord, phoneNo})
    try {
        const result=await newUser.save();
        console.log("data saved");
        res.send("done")
    } catch (error) {
        console.log(error)
    }
})
app.get("/login", async(req,res)=>{
    // const userData=req;
    // console.log(req.query.userData)
    const {name, passWord}=req.query.userData;
    try {
        const resp =await UserModel.find({name:name, passWord:passWord});
        console.log(resp)
        if(resp.length === 1){
            res.send("verified")
            // console.log("logged in")
        }
        else{
            res.send("not Verified")
            console.log("not verified")
        }
    } catch (error) {
        console.log(error)
    }
    
})

readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT , () => {
        console.log('you are listening to port ' , PORT)
    })
}

server() ; 
