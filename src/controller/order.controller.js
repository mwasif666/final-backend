const Order = require("../models/Order");

const placedOrder = async (req, res) => {
  const {
    orderDetails,
    totalPrice,
    totalQty,
    shippingAddress,
    cusName,
    cusId,
    phoneNo,
    zipCode,
    city,
    country,
    orderStatus,
  } = req.body;

  // if (
  //   [
  //     orderDetails,
  //     totalPrice,
  //     totalQty,
  //     shippingAddress,
  //     cusName,
  //     cusId,
  //     phoneNo,
  //     zipCode,
  //     city,
  //     country,
  //     orderStatus,
  //   ].some((field) => !field || field.trim() === "")
  // ) {
  //   return res
  //     .status(401)
  //     .json({ message: "All fields are required!", success: false });
  // }

  try {
    // Auto Increment OrderNo
    const maxNo = await Order.findOne(
      {},
      { orderNo: 1 },
      { sort: { orderNo: -1 } }
    );
    const nextOrderNo = maxNo ? maxNo.orderNo + 1 : 1;

    const order = await Order.create({
      orderNo: nextOrderNo,
      orderInfo: orderDetails,
      totalPrice,
      totalQty,
      shippingAddress,
      cusName,
      cusId: req.user._id,
      phoneNo,
      zipCode,
      city,
      country,
      orderStatus,
    });

    if (!order) {
      return res
        .status(501)
        .json({ message: "Error in Creating Order", success: false });
    }

    res
      .status(201)
      .json({ message: "Order Placed Successfully", success: true, order });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(501).json({
      message: "Something Went Wrong In Placing Order",
      success: false,
    });
  }
};


const getOrder = async (req, res) => {
  const { orderStatus } = req.query;
  try {
    const fetchOrder = await Order.find({ orderStatus });

    if (!fetchOrder || fetchOrder.length === 0) {
      return res
        .status(404)
        .json({ message: "Order Not Found!", success: false });
    }

    res
      .status(200)
      .json({
        message: "Order Fetched Successfully",
        success: true,
        orders: fetchOrder,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something Went Wrong In Fetching Order",
      success: false,
    });
  }
};

const updateOrder = async (req, res) => {
  const { productNo, ProductId, orderStatus } = req.body;
  try {
    const orderUpdate = await Order.findOneAndUpdate(
      { productNo },
      { $set: { orderStatus: orderStatus } },
      { new: true }
    );
    if (!orderUpdate) {
      return res
        .status(501)
        .json({ message: "Error in Update Order", success: false });
    }
    res
      .status(201)
      .json({ message: "Order Updated Sucessfully", success: true });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(501).json({
      message: "Some thing Went Wrong In Placing Order",
      success: false,
    });
  }
};

module.exports = { placedOrder, getOrder, updateOrder };
