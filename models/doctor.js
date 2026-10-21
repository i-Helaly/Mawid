
const mongoose = require("../config/databaseConnection");


const DoctorSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    specialty: {
        type: String,
        required: [true, "specialty is Required"],
        trim: true,
    },
    slotDuration:{
        type: Number,
        required: true
    },
    workWeek: [
    {
        day: {
            type: String,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    }
]
})



const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor