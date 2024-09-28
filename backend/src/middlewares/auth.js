const jwt = require("jsonwebtoken");
const User=require("../models/User.js");

const userAuth = async (req,res,next)=>{
    
    try{ 
    // extract the cookie and token from the req
     const cookie= req.cookies;
     const {token}= cookie;
     // validate the token
     if(!token){
        throw new Error("token not found!!!");
     }
     const decodedMsg= jwt.verify(token,"hijek");
     const {userId}= decodedMsg;

     const user= await User.findById(userId);
     if(!user){
        throw new Error("User not registered!!");
     }
     req.user=user;// attach the user to request
     next();
    }catch(err){
       res.send("Error: "+ err.message);
    }
}


const therapistAuth= (req,res,next)=>{
     
    console.log("therapist auth is getting checked");
    
    const token= "hehe";
    const isTherapistAuthorised= token==="hehe";

    if(!isTherapistAuthorised){
        res.status(401).send("Unauthorised Request!!");
    }else{
        next();
    }

};

module.exports = { therapistAuth, userAuth};
