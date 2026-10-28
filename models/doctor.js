
const mongoose = require("../config/databaseConnection");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      minlength: 8,
      required: true,
      select: false,
    },

    specialty: {
      type: String,
      trim: true,
      required: [true, "Specialty is required"],
    },

    slotDuration: {
      type: Number,
      required: true,
      min: 5,
    },

    workWeek: [
      {
        day: {
          type: String,
          enum: [
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          required: true,
        },

        startTime: {
          type: String,
          required: true,
        },

        endTime: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
