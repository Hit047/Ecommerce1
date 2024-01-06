const express = require("express");
const productSchemas = require("../models/backRouteModel");
const path = require("path");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// app.use(express.static(path.join(__dirname, "images")));
const upload = require("../middlewar/upload");

const {
  getAllProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  Cproduct,
  createProduct,
} = require("../controllers/productsController");
//creates an instance of the router to use in the functions
const router = express.Router();

// app.use("/api/upload", require("./Routes/upload"));
//asd

// Get all workouts
router.get("/products1", getAllProducts);

// Get a single workout
router.get("/products1/:id", getOneProduct);

// Static Folder
// router.use(express.static(path.join(__dirname, "images")));

// upload.single("image"),
// Post a new workout
router.post("/products1", upload.single("image"), createProduct);

// Delete a nworkout
router.delete("/products1/:id", deleteProduct);

// Update a workout
router.patch("/products1/:id", upload.single("image"), updateProduct);

module.exports = router;
