
const mongoose = require("../config/databaseConnection");


const appointmentSchema = new mongoose.Schema({

    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
         required: true,
    },
    start:{
        type: Date,
        required: true,
    },
    status:{
        type: String,
        enum: ["pending", "confirmed", "rejected", "completed", "cancelled", "no-show"],
        default: "pending",
      
    }
} , {timestamps: true});

const Appointment = mongoose.model("Appointment" ,appointmentSchema );
module.exports = Appointment





// const Appointment = mongoose.model("Appointment" , appointmentSchema);

// module.exports = Appointment;