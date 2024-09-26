const express= require("express");
const connectDB=require("./config/database.js");
const {therapistAuth}= require("./middlewares/auth");
const User=require("./models/User.js");
const app= express();

app.use(express.json());

app.post("/signup", async (req,res)=>{
   
   const newUser=  User(req.body);
   try{
     await newUser.save();
     res.send( "user registered successfully");
   }catch(err){
     res.status(400).send("not able to save user due to",err.msg);
   }
})

connectDB()
 .then(()=>{
    console.log("database connection established!!")
    app.listen(3000, ()=>{
        console.log("server up hai aur daur rha");
    });
  })
 .catch(()=>{
    console.log("db connection failed");
 })

app.use("/",(err,req,res,next)=>{
    if(err){
        console.log("something went wrong!!!");   
    }
})
