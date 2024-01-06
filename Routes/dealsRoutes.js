const express = require("express");
const dealsSchema = require("../models/dealsModel");
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
  getAllDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal,
  getDealsByCategory,
} = require("../controllers/dealsController");

const router = express.Router();

router.get("/deals", getAllDeals);

router.get("/deals/:id", getDealById);

router.use(express.static(path.join(__dirname, "images")));

router.post("/deals", upload.single("image"), createDeal);

router.delete("/deals/:id", deleteDeal);

// router.patch("/deal/:id", updateDeal);

module.exports = router;
