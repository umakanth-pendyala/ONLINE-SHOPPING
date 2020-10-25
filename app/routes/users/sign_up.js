const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../../models/user_schema");
const querystring = require("querystring");
const session = require("express-session");

router.get("/sign_up", (req, res) => {
  res.render("signup");
});

router.post("/sign_up", async (req, res) => {
  const User = mongoose.model("user", userSchema);
  req.body.homeAddress = "new nullakunta";
  try {
    const user = new User({
      name: req.body.username.trim(),
      email: req.body.email.trim(),
      password: req.body.password.trim(),
      homeAddress: req.body.homeAddress,
    });
    const result = await user.save();
    if (result != null || result != undefined) {
      req.session.username = result.username;
      req.session.cookie.expires = false;
      req.session.save(err => {
        if (err) res.send("opps ! session expired");
        res.redirect("/");
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

module.exports = router;
