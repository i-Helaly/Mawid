
const {body, validationResult} = require("express-validator");

const validator = [
    body("name")
    .notEmpty()
    .withMessage("name must be not empty")
    .isLength({min:3 , max: 20})
    .withMessage("range of name 20 char")
    .trim(),
    body("email")
    .isEmail()
    .withMessage("must be email")
    .notEmpty()
    .withMessage("email is must be not empty"),
    body("password")
    .notEmpty()
    .withMessage("password must be not empty")
    .isLength({min: 8})
    .withMessage("Password must be at least 8 characters long")
]
module.exports = validator;