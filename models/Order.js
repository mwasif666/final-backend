const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

const orderSchema = new Schema({
  OrderNo:{
    type: String, 
    required: true
  },
  user:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "user"
  },
  prodNo: {
    type: String,
    required: true,
    default: 1,
  },
  prodTitle: {
    type: String,
    required: true,
  },
  prodPrice:{
      type:String,
      required:true
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
  prodCategory: {
    type: String,
    required: true,
  },
  productQty:{
    type:Number,
    required:true
  },
  status:{
    type:String , 
    default:'PENDING',
  },
  deliveryStatus:{
    type:String,
    default:'unshipped',
  },
  phone:{
    type:Number,
    required:true
  },
  address:{
    type:String,
    requierd:true
  }

});

const Order = mongoose.model("order", orderSchema);
Order.createIndexes();
module.exports = Order;
