const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.username != null || req.session.username != undefined) {
    console.log('user name from home route "/" is', req.username);
  }
  console.log(req.session);
  res.render("catalog");
});

module.exports = router;
