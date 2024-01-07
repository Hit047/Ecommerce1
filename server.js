require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const backRoutes = require("./Routes/backRoutes");
const dealsRoutes = require("./Routes/dealsRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const userRoutes = require("./Routes/users");
const cors = require("cors");
const bodyParser = require("body-parser");

const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.static("./"));
app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api", backRoutes);
app.use("/api", dealsRoutes);
app.use("/api", categoryRoutes);
app.use("/api/user", userRoutes);
//connect to db:
mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    // useNewUrlParser: true,
  )
  .then(() => {
    //routes,the api/workouts means when used in thunderclient it will access the folder with the designated api calls
    app.use("/api", backRoutes);
    app.use("/api", dealsRoutes);
    app.use("/api", categoryRoutes);

    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port", process.env.PORT);
    });
  })

  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.json("Hello");
});
