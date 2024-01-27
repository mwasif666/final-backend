const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "wasifisagoodboy12#";
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

// Routes:01 for user sign up, status:done ,testing complete
const adminSignUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, cnic, DOB, phoneNumber, address } =
      req.body;
    let findAdmin = await Admin.find({
      $or: [{ email }, { phoneNumber },{ cnic }],
    });
    if (findAdmin.length !== 0) {
      return res.status(401).json({
        message: "User found with this credentials",
        success: false,
      });
    }
    let salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // for auto genertate the number
    const maxNumber = await Admin.findOne(
      {},
      { adminID: 1 },
      { sort: { adminID: -1 } }
    );
    const nextNo = maxNumber ? maxNumber.adminID + 1 : 1;

    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      cnic,
      DOB,
      adminID: nextNo,
      phoneNumber,
      address,
      password: secPass,
    });

    const data = {
      admin: {
        id: admin.id,
        firstName: admin.firstName,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
      },
    };
    const { password, ...logedInUser } = admin.toObject();
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({
      authToken,
      logedInUser,
      message: "Admin Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in admin" });
  }
};

// Route:02 for user login
const adminLogin = async (req, res) => {
  // Validate the request data
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { phoneNumber, password } = req.body;
  try {
    // Check if the user exists in the database
    let admin = await Admin.findOne({ phoneNumber });
    if (admin) {
      // Compare the entered password with the hashed password in the database
      let passwordMatch = await bcrypt.compare(password, admin.password);
      if (passwordMatch) {
        // Password is valid, create a JWT token
        const data = {
          id: admin.id,
          firstName: admin.firstName,
          email: admin.email,
          phoneNumber: admin.phoneNumber,
        };
        const { password, ...logedInUser } = admin.toObject();
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({
          authToken,
          logedInUser,
          message: "Admin Created Successfully",
          success: true,
        });
      } else {
        // Password does not match
        res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }
    } else {
      // User not found
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    // Internal server error
    res.status(500).send("Some error occurred");
  }
};
module.exports = { adminSignUp, adminLogin };
