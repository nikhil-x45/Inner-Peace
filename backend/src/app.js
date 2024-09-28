const express= require("express");
const connectDB=require("./config/database.js");
const {therapistAuth}= require("./middlewares/auth");
const User=require("./models/User.js");
const bcrypt= require("bcrypt");
const {validateSignup}= require("./utils/validaton.js");
const app= express();

app.use(express.json());

app.post("/signup", async (req,res)=>{
    // validation of the data (if not correct,throw error and dont let user register)
    try{
        
      validateSignup(req);
      
      const {userName,password,Name,email,age,userType}=req.body
    // Encrypt the password and then store into DB
     
    const hashedPassword= await bcrypt.hash(password,10);


     const newUser=  User({
       userName,Name,email,age,userType,
       password:hashedPassword,
     });
   
     await newUser.save();
     res.send( "user registered successfully");
   }catch(err){
     res.status(400).send("not able to save user due to",err.msg);
   }
});

app.post("/login", async(req,res)=>{
    // validate the incoming data
    try{ 
    validateLoginData(req);
    // once validated, move ahead
    const {emailId,password}=req.body;
    // check if email(user) is present in the db or not
    const user = await User.find({email:emailId});
    if(!user){
      throw new Error("Invalid Credentials!!");
    }
    // check the password is correct or not 
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
       throw new Error("Invalid Credentials!!")
    }
    else{
      res.send("Login Successful!!!");
    }
  }
    catch(err){
      res.status(400).send("error:"+err.message);
    }
});

app.get("/user",(req,res)=>{
   
      if (age && (isNaN(age) || age < 18)) {
        return res.status(400).json({ error: 'Age must be a number and at least 18' });
      }
    
    try{
        

    }catch(err){
        
    }
})

app.patch("/user",(req,res)=>{
    const data= req.body;
    try{

    }catch(err){

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
