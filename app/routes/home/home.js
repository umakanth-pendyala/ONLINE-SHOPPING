const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  userData = {
    email: null,
    username: null,
  };
  if (req.session.userInformation != null || req.session.userInformation != undefined) {
    userData = req.session.userInformation;
  }
  res.render("catalog", userData);
  return;
});

module.exports = router;
