const express = require("express");
const router = express.Router();
const fetchAdmin = require("../middelware/fetchAdmin");
const Product = require("../models/Product");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// 01 This is our first route for add product
router.post(
  "/addproduct",
  fetchAdmin,
  upload.array("image", 2),
  [
    body("prodTitle", "Enter a valid product title").isLength({ min: 3 }),
    body("prodDesc", "Enter a valid product description").isLength({ min: 23 }),
    body("prodPrice", "Enter a valid product price").isLength({ min: 2 }),
    body("prodQty", "Enter a valid product qunatity").isLength({ min: 1 }),
    body("prodSize", "Enter a valid product size").isLength({ min: 1 }),
    body("prodColor", "Enter a valid product color").isLength({ min: 2 }),
    body("prodCategory", "Enter a valid product category").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }

      const maxNo = await Product.find(
        {},
        { prodNo: 1 },
        { sort: { prodNo: -1 } }
      );
      const nextProdNo = maxNo ? maxNo.prodNo + 1 : 1;

      // Handle multiple image uploads
      const images = req.files;
      const prodImgPaths = images.map((image) => image.path);

      const product = await Product({
        prodNo: nextProdNo,
        prodTitle: req.body.prodTitle,
        prodDesc: req.body.prodDesc,
        prodPrice: req.body.prodPrice,
        prodImg1: prodImgPaths[0],
        prodImg2: prodImgPaths[1],
        prodQty: req.body.prodQty,
        prodSize: req.body.prodSize,
        prodColor: req.body.prodColor,
        prodCategory: req.body.prodCategory,
      });
      const prod = await product.save();
      res
        .status(200)
        .json({ message: "Product Added Successfully", product: prod });
    } catch (err) {
      res.status(401).json({ message: "Some thing went wrong!", error: err });
    }
  }
);

// 02 This is our first route for add product
router.put(
  "/updateproduct/:Id",
  fetchAdmin,
  upload.single("image"),
  [
    body("prodTitle", "Enter a valid product title").isLength({ min: 3 }),
    body("prodDesc", "Enter a valid product description").isLength({ min: 23 }),
    body("prodPrice", "Enter a valid product price").isLength({ min: 2 }),
    body("prodQty", "Enter a valid product qunatity").isLength({ min: 1 }),
    body("prodSize", "Enter a valid product size").isLength({ min: 1 }),
    body("prodColor", "Enter a valid product color").isLength({ min: 2 }),
    body("prodCategory", "Enter a valid product category").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const findProd = await Product.findOne({ prodNo: req.body.prodNo });
      if (!findProd) {
        res.status(400).json({ errors: errors.array() });
      }
      (findProd.prodTitle = req.body.prodTitle),
        (findProd.prodDesc = req.body.prodDesc),
        (findProd.prodPrice = req.body.prodPrice),
        (findProd.prodQty = req.body.prodQty),
        (findProd.prodColor = req.body.prodColor),
        (findProd.prodSize = req.body.prodSize),
        (findProd.prodCategory = req.body.prodCategory);
      if (req.file) {
        findProd.prodImg1 = req.file.path;
      }
      if (req.file) {
        findProd.prodImg2 = req.file.path;
      }
      const udateProd = await findProd.save();
      res
        .status(200)
        .json({ message: "Product Updated Successfully", product: udateProd });
    } catch (err) {
      res.status(401).json({ message: "Some thing went wrong!", error: err });
    }
  }
);

// 03 This router is for delete product
router.delete("/deleteproduct/:Id", fetchAdmin, async (req, res) => {
  try {
    const findProd = await Product.findOne({ prodNo: req.body.prodNo });
    if (!findProd) {
      res.status(400).json({ message: "Some thing went wrong!" });
    }
    const delProd = await findProd.remove();
    res
      .status(200)
      .json({ message: "Product Deleted Successfully", product: delProd });
  } catch (err) {
    res.status(401).json({ message: "Some thing went wrong!", error: err });
  }
});

// 04 This api is for view product
router.get("/getproduct", async (req, res) => {
  try {
    let find = await Product.find();
    if (find) {
      res.status(200).json({ product: find, success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (error) {
    res.status(401).json({ message: "Some thing went wrong!", error: err });
  }
});

// 05 This api is for view single product 
router.get("/getproduct/:prodNo", async (req, res) => {
  const prodNo = req.params.body
  try {
    let find = await Product.findOne({prodNo});
    if (find) {
      res.status(200).json({ product: find, success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (error) {
    res.status(401).json({ message: "Some thing went wrong!", error: err });
  }
});
module.exports = router;
