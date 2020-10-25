const express = require("express");
const router = express.Router();

// router.get("/sign_in", (req, res) => {
//   res.send("this is sign in page");
// });

const dummyData = {};

router.post("/sign_in", (req, res) => {
  res.send("this is sign in form route");
  console.log(req.body);
});

module.exports = router;
