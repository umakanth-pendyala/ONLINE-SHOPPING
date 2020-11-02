const express = require("express");
const mongoose = require("mongoose");
const orderSchema = require("../../models/orders_schema");
const productSchema = require("../../models/product_schema");
const router = express.Router();

router.get("/cart/:productId", async (req, res) => {
  const Product = mongoose.model("product", productSchema);
  if (req.session.userInformation == undefined) {
    res.send("please sign in to order");
    return;
  }
  const product = await Product.findOne({ _id: req.params.productId });
  if (product == null || product == undefined) {
    res.send("product not found");
    return;
  }
  req.session.productInformation = {};
  req.session.productInformation = {
    productName: product.productName,
    productId: product._id,
    productImage: product.productImage,
    productDescription: product.description,
    price: product.price,
  };
  res.redirect("/user/cart");
  return;
});

router.get("/cart", async (req, res) => {
  var sendingInformation = {};
  if (req.session.userInformation != null || req.session.userInformation != undefined) {
    sendingInformation.userData = req.session.userInformation;
  } else {
    sendingInformation.userData = {
      email: null,
      username: null,
    };
    res.send("please sign in to order");
    return;
  }
  const Order = mongoose.model("order", orderSchema);
  if (req.session.productInformation == undefined) {
    //show the cart page without any cart addition
    const productsData = await Order.findOne({ email: req.session.userInformation.email });
    sendingInformation.productsData = productsData;
    res.render("cart", sendingInformation);
    return;
  } else {
    const productInformation = req.session.productInformation;
    req.session.productInformation = undefined;
    const result = await Order.findOneAndUpdate(
      {
        email: sendingInformation.userData.email,
      },
      {
        $push: { productsInCart: productInformation },
      }
    );
    const productsData = await Order.findOne({ email: req.session.userInformation.email });
    sendingInformation.productsData = productsData;
    console.log(sendingInformation);
    res.render("cart", sendingInformation);
    return;
  }
});

router.get("/addtoorders/:productId", async (req, res) => {
  if (req.session.userInformation == null || req.session.userInformation == undefined) {
    res.send("please sign in to perform this action");
    return;
  }

  try {
    //delete the order from cart
    const Order = mongoose.model("order", orderSchema);
    const result = await Order.updateOne(
      {
        email: req.session.userInformation.email,
      },
      {
        $pull: { productsInCart: { productId: req.params.productId } },
      }
    );
    res.redirect(`/user/order/${req.params.productId}`);
    return;
  } catch (e) {
    console.log(e);
    res.send("product not found");
    return;
  }
});

router.get("/deletefromcart/:productId", (req, res) => {
  res.redirect("/user/cart");
  return;
});

// router.get("/test", (req, res) => {
//   const Order = mongoose.model("order", orderSchema);

//   const productInformation = {
//     productName: "Head Phones",
//     productId: "5f95e05008100d4fec1141cf",
//     productImage: "blah..blah..blah",
//     transportStatus: 0,
//     delivaryStatus: "Not Delivered",
//     price: 5000,
//   };

//   const dummyUserData = {
//     username: "umakanth pendyala",
//     email: "umakanthpendyala@gmail.com",
//     homeAddress: "blah..blah..blah",
//   };
// });

module.exports = router;
