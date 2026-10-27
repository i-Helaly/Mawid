
const mongoose = require("../config/databaseConnection");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required : [true , "Name is Required"]
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required : [true , "email is Required"]
    },
    password:{
        type: String,
        trim: true,
        minLength: 8,
        // select: false,
        required: true
    },
    role:{
        type: String,
        enum: ["patient" , "doctor" , "admin"],
        default: "patient",

    },
    isBlock:{
        type: Boolean,
        default: false,

    },
    token:{
        type: String,
    }


} , {timestamps: true})

const User = mongoose.model("User" , userSchema);

module.exports = User