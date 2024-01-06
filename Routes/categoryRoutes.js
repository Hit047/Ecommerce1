const express = require("express");
const categorySchema = require("../models/categoryModel");
const path = require("path");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.static(path.join(__dirname, "images")));
const upload = require("../middlewar/upload");

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/categories", getAllCategories);

router.get("/categories/:id", getCategoryById);

router.post("/categories", upload.single("categoryImage"), createCategory);

router.put("/categories/:id", upload.single("categoryImage"), updateCategory);

router.delete("/categories/:id", deleteCategory);

module.exports = router;
