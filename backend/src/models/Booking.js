
const mongoose= require("mongoose");

const bookingSchema= mongoose.Schema({
    
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        req:true,
    },
    event:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Event",
        required:true,
    },
},{timestamps:true});

module.exports= mongoose.model("Booking",bookingSchema);
