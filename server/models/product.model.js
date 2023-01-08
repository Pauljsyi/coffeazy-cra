const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: [true, "product name is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  image: {
    type: String,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
