const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    Name:{
        type:String
    },
    age:{
        type:Number
    },
    role: {
        type:String
    },
    phoneNumber:{
        type:Number
    },
    email:{
        type:String
    },
    password:{
        type:String
    }, 
})

const User= mongoose.model("User",userSchema);

module.exports= User;