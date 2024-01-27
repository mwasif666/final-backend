const express = require("express");
const router = express.Router();
const { userSignUpValidation , userLoginValidation} = require('../validation/admin.validation.js'); 
const { userSignUp, userLogin } = require("../controller/user.controller.js");


router.post("/signup",userSignUpValidation , userSignUp);
router.post("/login" ,userLoginValidation , userLogin);

module.exports = router;