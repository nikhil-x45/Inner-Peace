const express= require("express");
const connectDB=require("./config/database.js");
const {therapistAuth}= require("./middlewares/auth");
const User=require("./models/User.js");
const bcrypt= require("bcrypt");
const {validateSignup}= require("./utils/validaton.js");
const app= express();
const cookie= require("cookie-parser");
const jwt = require("jsonwebtoken"); 
const {userAuth}= require("./middlewares/auth.js")


app.use(express.json());
app.use(cookie());


app.post("/signup", async (req,res)=>{
    // validation of the data (if not correct,throw error and dont let user register)
    try{
        
      validateSignup(req);
      
    const {userName,password,Name,email,age,userType}=req.body;
    // Encrypt the password and then store into DB
     
    const hashedPassword= await bcrypt.hash(password,10);

    console.log("hashed:", hashedPassword);
     const newUser=  new User({
       userName,Name,email,age,userType,
       password:hashedPassword,
     });
     await newUser.save();
     res.send( "user registered successfully");
   }
    catch(err){
     console.error("Error saving user:", err);
     res.send("not able to save user due to "+ err.msg);
   }
});

app.post("/login", async(req,res)=>{
    // validate the incoming data
    try{ 
    //validateLoginData(req);
    // once validated, move ahead
    const {email,password}=req.body;
    // check if email(user) is present in the db or not
    const user = await User.findOne({email:email});
    if(!user){
      throw new Error("Invalid Credentials!!");
    }
    //check the password is correct or not 
      const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
       throw new Error("Invalid Credentials!!")
    }
    else{
      const token = jwt.sign({ userId: user._id }, "hijek");
      console.log("token",token);
      res.cookie("token",token);
      res.send("Login Successful!!!");
    }
  }
    catch(err){
      res.status(400).send("error:"+err.message);
    }
});

app.get("/profile",userAuth, async(req,res)=>{
   // user authenticated and u got the who is logged in user by auth Middleware!!
    try{
       const user=req.user;
       res.send(user);
    }catch(err){
        res.send("kuch to gadbad hai!!")
    }
});

 app.use("/",(req,res)=>{
    res.send("Hii from server");
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

// app.use("/",(err,req,res,next)=>{
//     if(err){
//         console.log("something went wrong!!!");   
//     }
// })
