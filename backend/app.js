const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./config/db");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

/* Middleware */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

/* API Routes */

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

/* Test Route */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Parasmani Backend Running 🚀",
  });
});

module.exports = app;