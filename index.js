const express = require("express");
const app = express();
const port = 5000;
const connectToMongo = require("./db");
const cors = require("cors");
const userAuth = require('./src/routes/userAuth.routes.js');
const adminAuth = require('./src/routes/adminAuth.routes.js');
const addProduct = require('./src/routes/addProduct.routes.js');

connectToMongo();

// * express.json is a middleware function in express which help parse the incoming request with json payload and it is based on body parser
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'))
app.use('/api/auth/v1', userAuth);
app.use('/api/auth/v1', adminAuth);
app.use('/api/prod/v1' , addProduct )
// app.use("/api/auth", require("./routes/userAuth"));
// app.use("/api/auth", require("./routes/adminAuth"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
