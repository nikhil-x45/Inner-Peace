const express= require("express");
const connectDB=require("./config/database.js");
const {therapistAuth}= require("./middlewares/auth")
const app= express();

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
