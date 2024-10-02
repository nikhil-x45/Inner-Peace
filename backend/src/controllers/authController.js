const User = require("../models/User");
const {validateSignup}= require("../utils/validaton");
const bcrypt= require("bcrypt");

const jwt = require("jsonwebtoken"); 
const nodemailer= require("nodemailer");

exports.signup = async (req,res) => {
    // validation of the data (if not correct,throw error and dont let user register)
    try{
      validateSignup(req);
      
    const { userName, password, Name, email, age, userType}=req.body;
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
};

exports.login= async (req,res) => {
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
};

exports.logout= async(req,res)=>{
     // user comes with a token to logout 
      res.cookie("token",null,{expires:new Date(Date.now())});
      res.send("Logged out!!"); 
     // 
};

// exports.resetPassword= async (req,res) =>{
   
//    try {
//     const cookie= req.cookies;
//     const token= cookie;
//     const {currentPassoword,newPassword}= req.body;
//     if(!token){
//         throw new Error("please login!!");
//     }
//     const decodedMsg= jwt.verify(token,"hijek");
//     const {userId}= decodedMsg;
    
//     // if user is logged in, he must be there in db.

//     const loggedInUser= await User.findById(userId);
//     if(!user){
//         throw new Error("Invalid Request!!");
//     }
//     // check if currentPassword matches with the one in the db.
//     const isCurrentPassword= await bcrypt.compare(currentPassoword,loggedInUser.password);
//     if(!isCurrentPassword){
//         throw new Error("please enter correct password!!");
//     }
//     const newPasswordhash= await bcrypt.hash(newPassword,10);
//     loggedInUser.password= newPasswordhash;

//     await loggedInUser.save();
//     res.send("Password reset successfully!!");
   
// } catch(err){
//     console.error('Reset password error:', err);
//     res.status(500).json({ message: "An error occurred. Please try again later." });
// }

// };







// exports.forgotPassword= async (req,res)=>{
//     // user must send an email 
//     const {email}=req.body;
//     // check email is registered in the db or not
//     const user= User.findOne({email:email});
    
//     // if user is registered, we can give them 2 option, reset-password and login, or direct login
//     if(user){
//       // create a token
//       const token= jwt.sign( 
//                              {userId:user._id},
//                              "hijek",
//                              {expiresIn:"1h"});
//         // we dont need to store the token as it already has info of user embedded
//         // so when we user comes back with this, we can verify back
//          const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
//          const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

//          const transporter= odemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USERNAME,
//                 pass: process.env.EMAIL_PASSWORD
//              }
//         });
 
    


//     }
// }