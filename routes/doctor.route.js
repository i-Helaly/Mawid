
const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");
const verifyToken = require("../middlewares/verfiyToken");
const role = require("../middlewares/role");

// All authenticated roles can view doctors

router.use(verifyToken,role("admin", "patient", "doctor"));
router.get(
    "/",
    doctorController.getAllDoctors
);

router.get(
    "/:id",
    doctorController.getADoctor
);



module.exports = router;
