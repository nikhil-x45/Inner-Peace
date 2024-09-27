const mongoose= require("mongoose");

const commentSchema= mongoose.Schema({
    postId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Post",
        required:true,
    },
    authorId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    supportCount: [{ 
         type: ObjectId,
         ref: 'User' 
    }],
},{timestamps:true});

module.exports= mongoose.model("Comment",commentSchema);