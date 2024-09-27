const mongoose= require("mongoose");

const supportgroupSchema=mongoose.Schema({

     groupName:{
        type:String,
        required:true,
     },
     Description:{
        type:String,
        required:true,
     },
     creatorId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
     },
     moderators: [{ 
        type: ObjectId,
        ref: 'User'
     }],
    members: [{
         type: ObjectId, 
         ref: 'User'
     }],
    isPrivate: { 
        type: Boolean,
        default: false 
    },
    membershipRequests: [{ 
        type: ObjectId, 
        ref: 'User' 
    }],
},{timestamps:true});

module.exports= mongoose.model("SupportGroup",supportgroupSchema);