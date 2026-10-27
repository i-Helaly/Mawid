
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validator = require("../middlewares/validator");
const resOfValidation = require("../middlewares/validationResult");
const loginValidator = require("../middlewares/loginvalidator");


router.post("/api/register" ,validator,resOfValidation ,authController.register );
router.post("/api/login" ,loginValidator,resOfValidation,authController.login );



module.exports = router