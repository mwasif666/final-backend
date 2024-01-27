const express = require("express");
const router = express.Router();
const fetchAdmin = require("../middlewares/fetchAdmin.js");
const {adminSignUp , adminLogin} = require('../controller/admin.controller.js');
const {adminSignUpValidation , adminLoginValidation} = require('../validation/admin.validation.js');


router.post("/adminsignup",adminSignUpValidation , fetchAdmin, adminSignUp);
router.post("/adminlogin",adminLoginValidation , adminLogin);

module.exports = router;