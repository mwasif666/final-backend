const express = require("express");
const router = express.Router();
const fetchAdmin = require("../middleware/fetchAdmin");
const { createOrder, getOrder } = require("../controller/order.controller");

router.post("/order",createOrder);
router.get("/order",fetchAdmin, getOrder);

module.exports = router;