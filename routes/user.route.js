
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")

router.post("/api/user" , userController.createUsers);

module.exports = router;