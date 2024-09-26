const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase: true,
        trim: true,
    },
    password:{
        type:String,
        required:true,
    }, 
    Name:{
        type:String,
        required:true,
        trim:true,
    },
    age:{
        type:Number,
        min:14,
        max:120,
    },
    userType: {
        type:String,
        required:true,
        enum:["peer","therapist","admin"],
        default:"peer",
    },
},{timestamps:true})

const User= mongoose.model("User",userSchema);

module.exports= User;