const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  categoryImage: {
    type: String,
    required: [true, "Category image is required"],
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
