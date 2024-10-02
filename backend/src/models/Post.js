const mongoose= require("mongoose");

const postSchema= mongoose.Schema({
     
   authorId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
   },
   title:{
        type:String,
        required:true,
     },
   content:{
        type:String,
        required:true,
     },
   isAnonymous:{
        type:Boolean,
        required:true,
        default:false,
   },
   Tags:{
      type:[String],
    
   },
   commentCount: { 
      type: Number, 
      default: 0 ,
   },
   visibility: {
       type: String, 
       enum: ['public', 'group'],
       default: 'public',
      },
   groupId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'SupportGroup' 
   }
},{timestamps:true});

module.exports= mongoose.model("Post",postSchema);