const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const orderSchema = require("../../models/orders_schema");

router.get("/order/:orderId/tracker", async (req, res) => {
  const Order = mongoose.model("order", orderSchema);
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
  const orderData = await getDetailsOfSpecificOrder(req.params.orderId, req.session.userInformation.email);
  console.log(orderData);
  sendingInformation.orderData = orderData;
  res.render("tracker", sendingInformation);
});

const getDetailsOfSpecificOrder = async (orderId, email) => {
  const productData = {};
  const Order = mongoose.model("order", orderSchema);

  const ordersData = await Order.findOne({ email: email });

  ordersData.productsOrdered.forEach(product => {
    if (product._id == orderId) {
      productData.delivaryDate = product.estimatedDelivaryDate;
      productData.productId = product._id;
      productData.delivaryStatus = product.delivaryStatus;
      productData.productName = product.productName;
      productData.transportStatus = product.transportStatus;
    }
  });
  return productData;
};

module.exports = router;
