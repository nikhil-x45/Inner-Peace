const mongoose= require("mongoose");

const eventSchema= mongoose.Schema({
    
    eventType:{
        type:String,
        required:true,
        enum:["1-1 session","Group-therapy","lecture"]
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Therapist",
    },
    Timing:{
        type:Date,
        required:true,
    },
    capacity:{
        type:Number,
        required:true,
    }

})

module.exports= mongoose.model("Event",eventSchema);