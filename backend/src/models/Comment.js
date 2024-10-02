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
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User' 
    }],
    parentCommentId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        default:null,
    }

},{timestamps:true});

module.exports= mongoose.model("Comment",commentSchema);