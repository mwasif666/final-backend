const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  prodNo: {
    type: String,
    required: true,
    default: 1,
  },
  prodTitle: {
    type: String,
    required: true,
  },
  prodDesc: {
    type: String,
    required: true,
  },
  prodImg1: {
    type: String,
    required: true,
  },
  prodImg2: {
    type: String,
    required: true,
  },
  prodQty: {
    type: Number,
    required: true,
    default: 1,
  },
  prodSize: {
    type: String,
    required: true,
  },
  prodColor: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);
Product.createIndexes();
module.exports = Product;
