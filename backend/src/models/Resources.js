const mongoose= require("mongoose");

const resourceSchema= mongoose.Schema({
   
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    Link: { 
        type: String,
        required:true, 
    },
    type: { 
        type: String, 
        enum: ['article', 'video'],
        required:true,
    },
    tags: { 
        type:[String],
     },
    isApproved:{
        type:Boolean,
        default:false,
        required:true,
     },
    likes:{
       type:Number,
    }
},{timestamps:true});

module.exports= mongoose.model("Resource",resourceSchema);