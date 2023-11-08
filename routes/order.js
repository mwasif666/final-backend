const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchAdmin = require("../middleware/fetchAdmin");
const Order = require("../models/Order");
const User = require("../models/User");


// Route No 01, Here we place Order
router.post(
  "/order",
  fetchAdmin,
  [
    body("prodNo", "Enter a valid name").isLength({ min: 1 }),
    body("prodTitle", "Enter a valid name").isLength({ min: 3 }),
    body("prodPrice", "Enter a valid price").isLength({ min: 2 }),
    body("prodQty", "Enter a valid quantity").isLength({ min: 1 }),
    body("prodSize", "Enter a valid size").isLength({ min: 1 }),
    body("prodColor", "Enter a valid color").isLength({ min: 1 }),
    body("prodCategory", "Enter a valid category").isLength({ min: 3 }),
    body("productQty", "Enter a valid quantity").isLength({ min: 1 }),
    body("phone", "Enter a valid phone number").isLength({ min: 10 }),
    body("address", "Enter a valid address").isLength({ min: 12 }),
    body("userId", "Enter a valid user ID").isLength({ min: 1 }),
  ],
  async (req, res) => {
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
);

// Route No 02, Here we get place Order
router.get(
    "/order",
    fetchAdmin,
    async (req, res) => {
      try {

        const order = await Order.find();
        res.json({
          order,
          message: "Get Order Successfully",
          success: true,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
      }
    }
  );

module.exports = router;