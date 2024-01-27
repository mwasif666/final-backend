const { body } = require("express-validator");

const addProdValidation = [
  body("prodTitle", "Enter a valid product title").isLength({ min: 3 }),
  body("prodDesc", "Enter a valid product description").isLength({ min: 23 }),
  body("prodPrice", "Enter a valid product price").isLength({ min: 2 }),
  body("prodQty", "Enter a valid product qunatity").isLength({ min: 1 }),
  body("prodSize", "Enter a valid product size").isLength({ min: 1 }),
  body("prodColor", "Enter a valid product color").isLength({ min: 2 }),
  body("prodCategory", "Enter a valid product category").isLength({ min: 3 }),
];

const updateProdValidation = [
  body("prodTitle", "Enter a valid product title").isLength({ min: 3 }),
  body("prodDesc", "Enter a valid product description").isLength({ min: 23 }),
  body("prodPrice", "Enter a valid product price").isLength({ min: 2 }),
  body("prodQty", "Enter a valid product qunatity").isLength({ min: 1 }),
  body("prodSize", "Enter a valid product size").isLength({ min: 1 }),
  body("prodColor", "Enter a valid product color").isLength({ min: 2 }),
  body("prodCategory", "Enter a valid product category").isLength({ min: 3 }),
];

const adminSignUpValidation = [
  body("firstName", "Enter a valid name").isLength({ min: 3 }),
  body("lastName", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid gmail").isEmail(),
  body("cnic", "Enter a valid cnic").isLength({ min: 12 }),
  body("phoneNumber", "Enter a valid phonenumber").isLength({ min: 10 }),
  body("address", "Enter a valid address").isLength({ min: 7 }),
  body("password", "Enter a valid password").isLength({ min: 7 }),
];

const adminLoginValidation = [
  body("phoneNumber", "Enter a valid phone number").exists(),
  body("password", "Enter a valid password").isLength({ min: 7 }),
];

const userSignUpValidation = [
  body("userName", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid gmail").isEmail(),
  body("password", "Password should be atleast 8 characters").isLength({
    min: 7,
  }),
];

const userLoginValidation = [
  body("email", "Enter a valid name").isEmail(),
  body("password", "Enter a valid password").isLength({ min: 7 }),
];

const orderValidation = [
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
];

module.exports = {
  addProdValidation,
  updateProdValidation,
  adminSignUpValidation,
  adminLoginValidation,
  userSignUpValidation,
  userLoginValidation,
  orderValidation,
};
