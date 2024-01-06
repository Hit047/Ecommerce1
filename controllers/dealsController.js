const path = require("path");
const Deal = require("../models/dealsModel");
const Category = require("../models/categoryModel");
const mongoose = require("mongoose");

//get all deals
const getAllDeals = async (req, res) => {
  try {
    //createdAt sorts the new created ones at the top
    const deals = await Deal.find({})
      .sort({ createdAt: -1 })
      .populate("categoryId");
    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ error: "Error fetching deals" });
  }
};

// get a single deal
const getDealById = async (req, res) => {
  //createdAt sorts the new created ones at the top
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such deal" });
  }

  try {
    const deal = await Deal.findById(id).populate("categoryId");
    if (!deal) {
      return res.status(400).json({ error: "No such deal" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching deal" });
  }
  res.status(200).json(deal);
};

// create new Deal
const createDeal = async (req, res) => {
  const { title, description, price, category } = req.body;
  console.log(req.body);
  const image = req.file.filename;

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
  // add doc to db
  try {
    //Workout is the documnet created in the db, here we are creating a new document
    const product = await Deal.create({
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

//delete Single
const deleteDeal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id" });
  }

  try {
    const deletedDeal = await Deal.findByIdAndDelete({ _id: id });
    if (!deletedDeal) {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting the product" });
  }
};

// //Update
// const updateDeal = async (req, res) => {
//   const { id } = req.params;
//   let { category, ...updateFields } = req.body;
//   let pathes = [];
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "Not valid id" });
//   }

//   try {
//     if (req.files) {
//       pathes = req.files.map((each) => each.path);
//     }
//     const deal = await Deal.findById({ _id: id });

//     if (!deal) {
//       return res.status(404).json({ error: "Deal not found" });
//     }

//     if (category) {
//       const findCategory = await Category.findOne({
//         categoryName: category,
//       });
//       // if (findCategory) {
//       //   categoryId = findCategory._id;
//       // }
//     }

//     // const updateObject = { ...updateFields };
//     // if (categoryId) {
//     //   updateObject.categoryId = categoryId;
//     // }

//     if (pathes.length > 0) {
//       updateObject.imagePath = pathes;
//     }

//     const updatedDeal = await Deal.findByIdAndUpdate(id, updateObject, {
//       new: true,
//     }).populate("categoryId");
//     res.status(200).json(updatedDeal);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getDealsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const foundCategory = await Category.findOne({ categoryName: category });
    if (!foundCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const deals = await Deal.find({ categoryId: foundCategory._id }).populate(
      "categoryId"
    );
    if (deals.length === 0) {
      return res
        .status(404)
        .json({ error: `No deals found in category '${category}'` });
    }

    res.status(200).json(deals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching deals by category" });
  }
};

module.exports = {
  getAllDeals,
  getDealById,
  getDealsByCategory,
  createDeal,
  deleteDeal,
};
