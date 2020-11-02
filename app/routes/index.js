const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

module.exports = app => {
  app.use("/admin", require("../routes/admin/admin"));
  app.use(express.static("public"));
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.set("view engine", "ejs");
  app.use(
    session({
      secret: "some-random-secret-key",
      resave: true,
      saveUninitialized: false,
      cookie: {
        /*maxAge: 600000*/
      },
    })
  );

  //user routes
  app.use("/", require("../routes/home/home"));
  app.use("/user", require("../routes/users/sign_up"));
  app.use("/user", require("../routes/users/sign_in"));
  app.use("/user", require("../routes/users/sign_out"));
  app.use("/product", require("../routes/products/product"));
  app.use("/", require("../routes/search/search"));
  app.use("/user", require("../routes/order/order"));
  app.use("/user", require("../routes/cart/cart"));
  app.use("/user", require("../routes/tracker/tracker"));
};
