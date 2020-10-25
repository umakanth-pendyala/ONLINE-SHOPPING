const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../../models/user_schema");
const querystring = require("querystring");

router.get("/sign_up", (req, res) => {
  res.render("signup");
});

router.post("/sign_up", async (req, res) => {
  let userInforamtion;
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
      userInformation = {
        email: result.email,
        username: result.name,
      };
      req.session.userInformation = userInformation;
      // req.session.cookie.expires = false;
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

module.exports = router;
