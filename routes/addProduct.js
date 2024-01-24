const express = require("express");
const router = express.Router();
const fetchAdmin = require("../middelware/fetchAdmin");
const Product = require("../models/Product");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Set your desired upload directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// 01 This is our first route for add product
router.post(
  "/addproduct",
  fetchAdmin,
  upload.fields([
    { name: "prodImg1", maxCount: 1 },
    { name: "prodImg2", maxCount: 1 },
  ]),
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

      const prodImg1Path = req.files["prodImg1"][0].path;
      const prodImg2Path = req.files["prodImg2"][0].path;

      const product = await Product({
        prodNo: nextProdNo,
        prodTitle: req.body.prodTitle,
        prodDesc: req.body.prodDesc,
        prodPrice: req.body.prodPrice,
        prodImg1: prodImg1Path,
        prodImg2: prodImg2Path,
        prodQty: req.body.prodQty,
        prodSize: req.body.prodSize,
        prodColor: req.body.prodColor,
        prodCategory: req.body.prodCategory,
        productFeatured: req.body.productFeatured,
      });
      const prod = await product.save();
      res.status(200).json({
        message: "Product Added Successfully",
        product: prod,
        success: true,
      });
    } catch (err) {
      console.log(err);
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
  if (req.query.productFeatured) {
    try {
      let findByFeatures = await Product.findOne({
        productFeatured: req.query.productFeatured,
      });
      if (findByFeatures) {
        res.status(201).json({
          message: "Product fetched Successfully!",
          findByFeatures,
          success: true,
        });
      } else {
        res.status(401).json({
          message: "Featured Not Found",
          success: false,
        });
      }
    } catch (error) {
      res.status(501).json({
        message: "Some thing went wrong in fetching products",
        error: err,
      });
    }
  } else {
    try {
      let find = await Product.find({});
      console.log(find);
      if (find) {
        res.status(200).json({
          message: "Product find Successfully",
          product: find,
          success: true,
        });
      } else {
        res
          .status(401)
          .json({ meesage: "Products not found!", success: false });
      }
    } catch (error) {
      res.status(501).json({
        message: "Some thing went wrong in fetching products",
        error: err,
      });
    }
  }
});

// 05 This api is for view single product
router.get("/getproduct/:prodNo", async (req, res) => {
  const prodNo = req.params.body;
  try {
    let find = await Product.findOne({ prodNo });
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
