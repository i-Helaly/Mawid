
const Appointment = require("../models/Appointment");
const httpRes = require("../utils/jsend");
const createAppointmentService = require("../services/appointment.service");
const User = require("../models/user")

const bookAppointment =async (req , res)=>{
    const {doctor  , start ,end } = req.body;

  const appointment = await createAppointmentService({
      doctor,
      user: req.user.userId,
      start,
      end
    });

    res.status(200).json({status: httpRes.SUCCESS , data: {appointment}});
}


module.exports = {
    bookAppointment
}