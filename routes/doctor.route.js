
const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");
const verifyToken = require("../middlewares/verfiyToken");
const role = require("../middlewares/role");

// Admin and user
router.get("/api/doctor" , verifyToken , role("admin" , "patient" , "doctors"),doctorController.getAllDoctors);
router.get("/api/doctor/:id" , verifyToken , role("admin ", "user" , "doctor"),doctorController.getADoctor);

// OnlyAdmin 
router.post("/api/doctor" , verifyToken , role("admin"),doctorController.createDoctors);
router.patch("/api/doctor/:id" , verifyToken , role("admin"),doctorController.updateADoctor);
router.delete("/api/doctor/:id" , verifyToken , role("admin"),doctorController.deleteADoctor);



module.exports = router;