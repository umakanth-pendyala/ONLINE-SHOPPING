const express = require("express");

module.exports = app => {
  app.use("/", require("../routes/home/home"));
  app.use("/user", require("../routes/users/sign_up"));
  app.use("/user", require("../routes/users/sign_in"));
};
