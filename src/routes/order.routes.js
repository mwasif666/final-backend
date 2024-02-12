const express = require("express");
const router = express.Router();
const fetchAdmin = require("../middlewares/fetchAdmin");
const { getOrder, placedOrder, updateOrder } = require("../controller/order.controller.js");
const fetchUser = require("../middlewares/fetchUser.js");

router.post("/placeorder",fetchUser , placedOrder);
router.get("/getorder",fetchAdmin,getOrder);
router.put("/updateorder",fetchAdmin,updateOrder);

module.exports = router;