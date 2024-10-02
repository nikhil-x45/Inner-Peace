const mongoose = require("mongoose");

const reportSchema= mongoose.Schema({
    reporterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    contentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'contentType',
        required:true,
    },
    contentType:{
        type:String,
        enum:["User","Post","Comment"],
        required:true,
    },
    reasons:{
        type:String,
        enum:["abuse","spam","harassment","others"],
        required:true,
    },
    details:{
        type:String,
        
    },
    reportCount: {
        type: Number,
        default: 1
    },
    status:{
        type:String,
        enum:["Pending","Under Review","Dismissed","Resolved"],
        default:"Pending"
    },
    moderatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    moderatorNotes:{
        type:String,
    },
},{timestamps:true});

module.exports = mongoose.model("Report",reportSchema);