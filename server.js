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
  },
  err => {
    if (!err) console.log("successfull");
    else console.log("failed");
  }
);

//middle wares
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

require("./app/routes")(app);

app.listen(3000, () => console.log("app is running on port 3000"));
