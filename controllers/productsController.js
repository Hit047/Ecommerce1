const path = require("path");
const Product = require("../models/backRouteModel");
const mongoose = require("mongoose");
const { response, json } = require("express");
const { error } = require("console");
const multer = require("multer");
const Category = require("../models/categoryModel");

const upload = require("../middlewar/upload");

//get all products
const getAllProducts = async (req, res) => {
  //createdAt sorts the new created ones at the top
  let filter = {};
  if (req.query.categories) {
    filter = { categoryId: req.query.categories.split(",") };
  }

  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .populate("categoryId");
  if (!products) {
    res.status(500).json({ success: false });
  }
  res.status(200).json(products);
  console.log(products);
};

// get a single product
const getOneProduct = async (req, res) => {
  //createdAt sorts the new created ones at the top
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }
  res.status(200).json(product);
};

// create new Product
const createProduct = async (req, res) => {
  const { title, description, price, category } = req.body;
  // const category = await Category.findById(req.body.category);
  // if (!category) return res.status(400).send("Invalid Category");
  const image = req.file.filename;
  // const category = await Category.findById(req.body.category);
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!image) {
    emptyFields.push("image");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  const findCategory = await Category.findOne({ categoryName: category });
  if (!findCategory) {
    return res.status(400).json({ error: `Category ${category} not found` });
  }

  const categoryId = findCategory._id;

  // const category = findCategory._id;

  // add doc to db
  try {
    //Workout is the documnet created in the db, here we are creating a new document
    const product = await Product.create({
      title,
      description,
      price,
      image,
      categoryId,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }
  // find the document in mongo were the id passed above is == to the id in the document-table _id below
  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }
  res.status(200).json(product);
};

//update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }
  //spread the properties of the object into a new object
  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }
  res.status(200).json(product);
};

module.exports = {
  createProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
};
