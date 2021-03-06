const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../../models/user_schema");

/**
 * THIS IS AJAX CALL. DONT CONFUSE.
 */
router.post("/sign_in", async (req, res) => {
  const User = mongoose.model("user", userSchema);
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  var userInformation = {
    email: null,
    username: null,
    userAuthenticated: false,
  };
  const result = await User.exists({ email: email, password: password });

  if (result == true) {
    // user auth is successfull
    const userDocument = await User.findOne({ email: email });
    userInformation.userAuthenticated = true;
    userInformation.email = userDocument.email;
    userInformation.username = userDocument.name;
    const userData = {
      email: userDocument.email,
      username: userDocument.name,
    };
    req.session.userInformation = userData;
    res.send(userInformation);
  } else {
    // user auth is not successfull
    userInformation.userAuthenticated = false;
    userInformation.email = null;
    userInformation.username = null;
    res.send(userInformation);
  }
  return;
});

module.exports = router;
