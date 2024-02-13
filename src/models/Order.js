const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderDetails = new Schema({
  productName: String,
  prodNo: Number,
  productPrice: String,
  productColor: String,
  productCategory: String,
  productFeature: String,
  ProductQty: String,
});
const OrderSchema = new Schema(
  {
    orderNo: {
      type: Number,
      default: 1,
    },
    orderInfo: [orderDetails],
    totalPrice: {
      type: String,
      required: true,
    },
    totalQty: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    cusName: {
      type: String,
      required: true,
    },
    cusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    phoneNo: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      anum: ["Pending", "InShipping", "Completed", "Cancelled"],
      required: true,
      default: "Pending",
    },
    updater: {
      type: String,
    },
    Date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
