const express = require("express");
const router = express.Router();
const productSchema = require("../../models/product_schema");
const mongoose = require("mongoose");

router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  var sendingInformation = {};
  const productInformation = await getProductDetails(productId);

  if (productInformation == null) {
    res.send("Product not found");
    return;
  } else {
    sendingInformation.productData = productInformation;
  }

  if (req.session.userInformation != null || req.session.userInformation != undefined) {
    sendingInformation.userData = req.session.userInformation;
  } else {
    sendingInformation.userData = {
      email: null,
      username: null,
    };
  }
  // console.log(sendingInformation);
  res.render("product", sendingInformation);
});

const getProductDetails = async productId => {
  try {
    const Product = mongoose.model("product", productSchema);
    const result = await Product.findOne({ _id: productId });
    if (result != null || result != undefined) {
      return result;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

module.exports = router;
