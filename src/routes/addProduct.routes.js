const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fetchAdmin = require("../middlewares/fetchAdmin");
const {
  addProduct,
  updateProd,
  deleteProd,
  getProd,
  getSingleProd,
} = require("../controller/product.controller.js");
const {
  addProdValidation,
  updateProdValidation,
} = require("../validation/admin.validation.js");

router.post(
  "/addproduct",
  fetchAdmin,
  upload.fields([
    { name: "prodImg1", maxCount: 1 },
    { name: "prodImg2", maxCount: 1 },
  ]),
  addProdValidation,
  addProduct
);

router.put(
  "/updateproduct/:id",
  fetchAdmin,
  upload.fields([
    { name: "prodImg1", maxCount: 1 },
    { name: "prodImg2", maxCount: 1 },
  ]),
  updateProdValidation,
  updateProd
);

router.delete("/deleteproduct/:id", fetchAdmin, deleteProd);

router.get("/getproduct", getProd);

router.get("/getproduct/:prodNo", getSingleProd);

module.exports = router;
