const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const orderSchema = require("../../models/orders_schema");
const userSchema = require("../../models/user_schema");
const productSchema = require("../../models/product_schema");

router.get("/order/:productId", async (req, res) => {
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
  const stock = product.stock;
  req.session.productInformation = {};
  req.session.productInformation = {
    productName: product.productName,
    productId: product._id,
    productImage: product.productImage,
    productDescription: product.description,
    delivaryStatus: "not yet delevered",
    price: product.price,
  };

  if (stock > 0) {
    const result = await Product.findOneAndUpdate({ _id: req.params.productId }, { stock: stock - 1 });
  } else {
    res.send("product is out of stock.");
  }

  res.redirect("/user/orders");
  return;
});

router.get("/orders", async (req, res) => {
  var sendingInformation = {};
  // sendingInformation.userData = userData = {};
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
    // res.send("this is product page without product addition");
    const productsData = await Order.findOne({ email: req.session.userInformation.email });
    sendingInformation.productsData = productsData;
    res.render("orders_history", sendingInformation);
    req.session.productInformation = undefined;
    return;
  } else {
    const productInformation = req.session.productInformation;
    req.session.productInformation = undefined;
    const result = await Order.findOneAndUpdate(
      {
        email: sendingInformation.userData.email,
      },
      {
        $push: { productsOrdered: productInformation },
      }
    );
    const productsData = await Order.findOne({ email: req.session.userInformation.email });
    sendingInformation.productsData = productsData;
    // res.send("this is order page with addition of product");
    res.render("orders_history", sendingInformation);
    req.session.productInformation = undefined;
    return;
  }
});

// router.get("/test", async (req, res) => {

//   const Order = mongoose.model("order", orderSchema);
//   // get product information from product id
//   const productInformation = {
//     productName: "Head Phones",
//     productId: "5f95e05008100d4fec1141cf",
//     productImage: "blah..blah..blah",
//     transportStatus: 0,
//     delivaryStatus: "Not Delivered",
//     price: 5000,
//   };

//   const dummyOrderData = {
//     username: "umakanth pendyala",
//     email: "umakanthpendyala@gmail.com",
//     homeAddress: "blah..blah..blah",
//   };

//   // const order = new Order(dummyOrderData);
//   // const result = await order.save();
//   const result = await Order.findOneAndUpdate(
//     {
//       email: "umakanthpendyala@gmail.com",
//     },
//     {
//       $push: { productsOrdered: productInformation },
//     }
//   );

//   res.send("this is test route");
// });

module.exports = router;
