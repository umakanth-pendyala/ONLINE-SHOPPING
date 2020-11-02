const mongoose = require("mongoose");
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
AdminBro.registerAdapter(AdminBroMongoose);
const userSchema = require("../../models/user_schema");
const productSchema = require("../../models/product_schema");
const ordersSchema = require("../../models/orders_schema");
const User = mongoose.model("user", userSchema);
const Product = mongoose.model("product", productSchema);
const Order = mongoose.model("order", ordersSchema);

const adminBro = new AdminBro({
  // databases: [mongoose],
  resources: [User, Product, Order],
  rootPath: "/admin",
});

const ADMIN = {
  email: "umakanth@gmail.com",
  password: "umakanth",
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: "admin-bro",
  cookiePassword: "some-secret-long-with-mulit-line-string",
  authenticate: async (email, password) => {
    if (email == ADMIN.email && password == ADMIN.password) {
      return ADMIN;
    }
    return null;
  },
});

module.exports = router;
