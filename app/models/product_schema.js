const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [10, "price cannot be that low"],
  },
  description: {
    type: String,
    required: true,
    maxLength: 2000,
  },
  stock: {
    type: Number,
    default: 10,
  },
  productImage: {
    type: String,
    default: null,
  },
});

module.exports = productSchema;
