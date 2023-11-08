const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

const orderSchema = new Schema({
  OrderNo: { type: String, required: true },
});

const Order = mongoose.model("order", orderSchema);
Order.createIndexes();
module.exports = Order;
