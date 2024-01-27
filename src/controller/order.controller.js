const { validationResult } = require("express-validator");
const Order = require("../models/Order");
const User = require("../models/User");


// Route No 01, Here we place Order
const createOrder = async(req , res)=>{
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Fetch the user by their ID to get the ObjectId
      const user = await User.findById(req.body.userId);

      // for auto generate the order number
      const maxNumber = await Order.findOne({}, { OrderNo: 1 }, { sort: { OrderNo: -1 } });
      const nextNo = maxNumber ? maxNumber.OrderNo + 1 : 1;

      const order = await Order.create({
        OrderNo: nextNo,
        user: user,
        prodTitle: req.body.prodTitle,
        prodPrice: req.body.prodPrice,
        prodQty: req.body.prodQty,
        prodSize: req.body.prodSize,
        prodColor: req.body.prodColor,
        prodCategory: req.body.prodCategory,
        productQty: req.body.productQty,
        phone: req.body.phone,
        address: req.body.address,
      });

      res.json({
        order,
        message: "Order Created Successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error" });
    }
}

// Route No 02, Here we get place Order
const getOrder =  async(req , res)=>{
      try {
        const order = await Order.find();
        res.json({
          order,
          message: "Get Order Successfully!",
          success: true,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
      }
}
  
module.exports = {createOrder , getOrder};