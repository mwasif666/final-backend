const jwt = require("jsonwebtoken");
const JWT_SECRET = "wasifisagoodboy12#";

const fetchAdmin = (req, res, next) => {
  const authToken = req.header("auth-token");
  if (!authToken) {
    res.status(500).json({ message: "Something went wrong!", status: false });
  }
  try {
    const data = jwt.sign(authToken, JWT_SECRET);
    req.admin = data.admin;
    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};
module.exports = fetchAdmin;

