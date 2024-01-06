const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dealsSchema = new Schema({
  image: {
    type: String,
    required: false,
  },
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
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Deals = mongoose.model("Deals", dealsSchema);

module.exports = Deals;
