const Product = require("../models/Product");
const { validationResult } = require("express-validator");

const addProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    }

    const maxNo = await Product.findOne(
      {},
      { prodNo: 1 },
      { sort: { prodNo: -1 } }
    );
    const nextProdNo = maxNo ? maxNo.prodNo + 1 : 1;

    const prodImg1Path = req.files["prodImg1"]
      ? req.files["prodImg1"][0].path
      : null;
    const prodImg2Path = req.files["prodImg2"]
      ? req.files["prodImg2"][0].path
      : null;

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

    if (!prod) {
      return res
        .status(404)
        .json({
          message: "Product cannot be saved try again!",
          success: false,
        });
    }

    res.status(200).json({
      message: "Product Added Successfully",
      product: prod,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
};

const updateProd = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const findProd = await Product.findOne({ _id: req.params.id });
    if (!findProd) {
      return res.status(400).json({ errors: errors.array() });
    }
    (findProd.prodTitle = req.body.prodTitle),
      (findProd.prodDesc = req.body.prodDesc),
      (findProd.prodPrice = req.body.prodPrice),
      (findProd.prodQty = req.body.prodQty),
      (findProd.prodColor = req.body.prodColor),
      (findProd.prodSize = req.body.prodSize),
      (findProd.prodCategory = req.body.prodCategory);
    findProd.productFeatured = req.body.productFeatured;
    if (req.files) {
      findProd.prodImg1 = req.files["prodImg1"]
        ? req.files["prodImg1"][0].path
        : null;
      findProd.prodImg2 = req.files["prodImg2"]
        ? req.files["prodImg2"][0].path
        : null;
    }
    const udateProd = await findProd.save();
    if (!updateProd) {
      res.status(401).json({ message: "Product Not upadted", success: false });
    }
    res.status(200).json({
      message: "Product Updated Successfully",
      product: udateProd,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Some thing went wrong! in updating product",
      error: err,
    });
  }
};

const deleteProd = async (req, res) => {
  try {
    const findProd = await Product.findOne({ _id: req.params.id });
    if (!findProd) {
      return res
        .status(400)
        .json({ message: "Product Not Found!", success: false });
    }
    const delProd = await Product.deleteOne({ _id: req.params.id });

    if (!delProd) {
      return res.status(400).json({
        message: "Something went wrong in deleting product",
        success: false,
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully",
      product: delProd,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Something went wrong!", error: err });
  }
};

const getProd = async (req, res) => {
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
        error: error,
      });
    }
  }
};

const getSingleProd = async (req, res) => {
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
};

module.exports = { addProduct, updateProd, deleteProd, getProd, getSingleProd };
