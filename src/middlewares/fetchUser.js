const jwt = require("jsonwebtoken");
const JWT_SECRET = "wasifisagoodboy12#";

const fetchUser = (req, res, next) => {
  const authToken = req.header("auth-token") || req.header("Authorization");

  if (!authToken) {
    return res.status(500).json({ message: "Something went wrong!", status: false });
  }

  // Check if Authorization header starts with "Bearer "
  const token = authToken.startsWith("Bearer ") ? authToken.slice(7) : authToken;

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
console.log(req.user);
    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};

module.exports = fetchUser;
