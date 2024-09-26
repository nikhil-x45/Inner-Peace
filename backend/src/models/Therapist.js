const mongoose = require("mongoose");
const User = require("./User");

const therapistSchema= mongoose.Schema({ 
        user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'User',
          required:true,
        },
        specialization: {
            type:[String],
            required:true,
        },
        degree:{
            type:[String],
            required:true,
        },
        licenseNumber: {
            type: String,
            required: true,
            unique:true,
          },
        yearOfExperience: {
            type:Number,
            required:true,
            min:1,
        },
        bio:{
            type:String,
            required:true,
        },
        availabilitySlots:{
            type: Object,
        }
})

module.exports= mongoose.model("Therapist",therapistSchema);

