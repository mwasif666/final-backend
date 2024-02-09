const jwt = require("jsonwebtoken");
const JWT_SECRET = "wasifisagoodboy12#";

const fetchAdmin = (req, res, next) => {
  const authToken = req.header("auth-token") || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }

  try {
    const data = jwt.verify(authToken, JWT_SECRET);
    req.admin = data.admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

module.exports = fetchAdmin;
