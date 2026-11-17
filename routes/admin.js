
const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");
const verifyToken = require("../middlewares/verfiyToken");
const role = require("../middlewares/role");
const userController = require("../controllers/user.controller");


router.use(verifyToken,role("admin"));


router.patch(
    "/users/:id/block", 
    userController.blockUser
);

router.patch(
    "/users/:id/unblock", 
    userController.unblockUser
);

router.post(
    "/doctor",
    doctorController.createDoctors
);

router.patch(
    "doctor/:id",
    doctorController.updateADoctor
);


router.delete(
    "/doctor/:id",
    doctorController.deleteADoctor
);

module.exports = router;

