const mongoose = require("mongoose");
// const { createProduct } = require("../controllers/productsController");

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
    // data: Buffer,
    // required: true,
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Product = mongoose.model("Products", productsSchema);

module.exports = Product;
