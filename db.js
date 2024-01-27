const mongoose = require("mongoose");

const mongooseURI =
  "mongodb+srv://mwasif666:Pakistan123@cluster0.qfk14ym.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongooseURI);
    console.log(`Connected to MongoDB successfully`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
