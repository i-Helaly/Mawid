const Appointment = require("../models/Appointment");
const createAppointment = async ({ doctor, user, start, end }) => {

const existingAppointment = await Appointment.findOne({
  doctor,
  start: { $lt: end },
  end: { $gt: start },
  status: { $in: ["pending", "confirmed"] }
});

console.log("EXISTING APPOINTMENT:", existingAppointment);

if (existingAppointment) {
  throw new Error("This appointment is already booked");
}

  const appointment = await Appointment.create({
    doctor,
    user,
    start,
    end
  });

  return appointment;
};

module.exports = createAppointment;