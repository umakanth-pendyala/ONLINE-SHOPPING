const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    requured: true,
  },
  name: {
    type: String,
    required: true,
  },
  homeAddress: {
    type: String,
    required: true,
  },
});

module.exports = userSchema;
