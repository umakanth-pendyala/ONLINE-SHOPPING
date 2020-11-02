const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsInOrderSchema = Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
    },
    productImage: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    estimatedDelivaryDate: {
      type: Date,
      default: Date.now(),
    },
    transportStatus: {
      type: Number,
      min: 0,
      max: 3,
      default: 0,
    },
    delivaryStatus: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const productsInCartSchema = Schema({
  productName: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
  },
  productImage: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  estimatedDelivaryDate: {
    type: Date,
    default: Date.now(),
  },

  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  homeAddress: {
    type: String,
    required: true,
  },
  productsOrdered: {
    type: [productsInOrderSchema],
  },
  productsInCart: {
    type: [productsInCartSchema],
  },
});

module.exports = orderSchema;
