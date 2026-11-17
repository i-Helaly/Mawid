
const express = require("express");
const router = express.Router();
const role = require("../middlewares/role");
const verfiyToken = require("../middlewares/verfiyToken")
const appointmentController = require("../controllers/appiontmentController");

router.post("/" ,verfiyToken,role("patient"), appointmentController.bookAppointment);






module.exports = router;