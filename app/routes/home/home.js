const express = require("express");
const router = express.Router();
const productSchema = require("../../models/product_schema");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  let catalogInformation = {};
  const products = await getAllProducts();
  catalogInformation.products = products;
  userData = {
    email: null,
    username: null,
  };
  catalogInformation.userData = userData;
  if (req.session.userInformation != null || req.session.userInformation != undefined) {
    catalogInformation.userData = req.session.userInformation;
  } else {
    catalogInformation.userData = {
      email: null,
      username: null,
    };
  }
  // res.render("catalog", userData);
  res.render("catalog", catalogInformation);
  return;
});

const getAllProducts = async () => {
  const Product = mongoose.model("product", productSchema);
  const allProducts = await Product.find();
  return allProducts;
};

router.get("/product", async (req, res) => {
  const Product = mongoose.model("product", productSchema);
  const productData = {
    productName: "San disk",
    price: 6999,
    description: `
      The SanDisk Ultra microSDXC UHS-I card is perfect for recording and watching Full HD video, 2 with room for even more hours of video. Water proof.Rated A1, the 400GB SanDisk Ultra microSD card is optimised for apps, delivering faster app launch and performance that provides a better smartphone experience.`,
    stock: 20,
    productImage: `https://rukminim1.flixcart.com/image/150/150/j7ksia80/memory-card/microsdxc/9/j/h/sandisk-sdsquar-064g-gn6ma-original-imaexs9zuyr9svhx.jpeg?q=70`,
  };

  try {
    const newProduct = new Product(productData);
    const result = await newProduct.save();
    console.log("product is saved", result);
    res.send("product saved");
  } catch (e) {
    console.log("product save not successfull");
  }
});

module.exports = router;
