const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../../models/user_schema");
const querystring = require("querystring");
const productSchema = require("../../models/product_schema");
const orderSchema = require("../../models/orders_schema");

router.get("/sign_up", (req, res) => {
  res.render("signup");
});

router.post("/sign_up", async (req, res) => {
  let userInforamtion;
  const User = mongoose.model("user", userSchema);
  try {
    const user = new User({
      name: req.body.username.trim(),
      email: req.body.email.trim(),
      password: req.body.password.trim(),
      homeAddress: req.body.homeAddress,
    });
    const userExists = await checkEmailExists(user.email);
    if (userExists) {
      res.send("user arleady exists with that email.");
      return;
    }
    const result = await user.save();
    const orderResult = await createOrdersTable(user.name, user.email, user.homeAddress);
    if (result != null || result != undefined) {
      userInformation = {
        email: result.email,
        username: result.name,
      };
      req.session.userInformation = userInformation;
      req.session.save(err => {
        if (err) res.send("opps ! session expired");
        else {
          res.redirect("/");
          return;
        }
      });
      return;
    } else {
      res.send("account not created");
      return;
    }
    console.log(result);
    return;
  } catch (e) {
    res.send("account not created");
    return;
  }
});

const createOrdersTable = async (username, email, homeAddress) => {
  const Order = mongoose.model("order", orderSchema);
  const order = new Order({ username, email, homeAddress });
  const result = await order.save();
  if (result != null || result != undefined) {
    return "success";
  } else {
    return "failed";
  }
};

const checkEmailExists = async email => {
  const User = mongoose.model("user", userSchema);
  const result = (await User.findOne({ email: email })) || null;
  if (result != null) {
    return true;
  }
  return false;
};

module.exports = router;
