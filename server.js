const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");

mongoose.connect(
  "mongodb://localhost:27017/ONLINE_SHOPPING",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  err => {
    if (!err) console.log("successfull");
    else console.log("failed");
  }
);

require("./app/routes")(app);

app.listen(3000, () => console.log("app is running on port 3000"));
