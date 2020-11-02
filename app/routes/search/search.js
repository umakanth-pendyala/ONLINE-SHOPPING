const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const productSchema = require("../../models/product_schema");

/**
 * RETURNS A SEARCH VIEW PAGE WITH MATCHED PRODUCTS
 */
router.post("/search_result", async (req, res) => {
  const userInput = req.body["search-input"];
  var sendingInformation = {};
  var userData = {};
  var productData = [];
  if (userInput == undefined) userInput = null;

  userData = {
    email: null,
    username: null,
  };
  sendingInformation.userData = userData;
  if (req.session.userInformation != null || req.session.userInformation != undefined) {
    sendingInformation.userData = req.session.userInformation;
  } else {
    sendingInformation.userData = {
      email: null,
      username: null,
    };
  }

  productData = await getRelatedProducts(userInput.trim());
  sendingInformation.matchedProducts = productData != null ? productData : [];
  res.render("search_view", sendingInformation);
});

/**
 * RETURNS SEARCH SUGGESTIONS FOR EVER KEY USER ENTERS
 */
router.post("/search", async (req, res) => {
  var sendingInformation = {};
  var matchedProducts = [];
  const userInput = req.body.userInput;

  matchedProducts = await getRelatedProducts(userInput.trim());
  sendingInformation.matchedProducts = matchedProducts != null ? matchedProducts : [];
  // console.log("sending information", sendingInformation);

  matchedProducts.forEach(product => {
    console.log(product.productName);
  });
  res.send(sendingInformation);
  return;
});

/**
 *
 * @param {string} userInput
 * @return either null or array of json containing product names
 */
const getRelatedProducts = async userInput => {
  //convert the user input variable into regular expression
  const searchString = new RegExp(userInput.trim(), "i");
  var matchedProducts = [];

  const Product = mongoose.model("product", productSchema);
  try {
    const Products = await Product.find({});
    if (Products.length != 0) {
      Products.forEach(product => {
        //match the product name to the input string
        if (
          product.productName.search(searchString) >= 0 ||
          product.description.search(searchString) >= 0 ||
          product.productName.split(" ").join("").search(searchString) >= 0
        ) {
          // match found
          matchedProducts.push({
            productName: product.productName,
            productImage: product.productImage,
            description: product.description,
            stock: product.stock,
            _id: product._id,
            price: product.price,
          });
        } else {
          // match not found
        }
      });
      return matchedProducts;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

module.exports = router;
