const validator= require("validator");

const validateSignup = (req ) =>{
   const {userName,email,password,Name, userType}= req.body;

   if(!userName || !Name || !userType){
       throw new Error ("please enter the valid details");
   }
   if(!validator.isEmail(email)){
      throw new Error("please enter the valid email!!");
   }
   if(!validator.isStrongPassword(password)){
     throw new Error("please enter strong password!!");
   }
};

module.exports= {validateSignup}; 