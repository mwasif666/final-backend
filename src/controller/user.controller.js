const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "wasifisagoodboy12#";
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Routes:01 for user sign up, status:done ,testing complete
const userSignUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userName, email, password } = req.body;
    let salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    let checkUserExist = await User.find({ email });
    if (checkUserExist.length !== 0) {
      return res
        .status(401)
        .json({ message: "Email is in used", success: false });
    }

    const user = await User.create({
      userName,
      email,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
      },
    };

    const userDetails = await User.findById({ _id: user._id }).select(
      "-password"
    );

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({
      authToken,
      userDetails,
      message: "User Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some thing went wrong" });
  }
};

// Route:02 for user login
const userLogin = async (req, res) => {
  // Validate the request data
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    let user = await User.findOne({ email });

    if (user) {
      // Compare the entered password with the hashed password in the database
      let passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const userDetails = await User.findById({ _id: user._id }).select(
          "-password"
        );

        // Password is valid, create a JWT token
        const data = {
          user: {
            id: user.id,
            userName: user.userName,
            email: user.email,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({
          authToken,
          userDetails,
          message: "User Created Successfully",
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
        message: "Username not found",
      });
    }
  } catch (error) {
    // Internal server error
    res.status(500).send("Some error occurred");
  }
};

module.exports = { userSignUp, userLogin };
