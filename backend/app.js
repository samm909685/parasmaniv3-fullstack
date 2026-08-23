const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

require("./config/db");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const designRequestRoutes = require("./routes/designRequestRoutes");

const app = express();

/* ==========================
   MIDDLEWARE
========================== */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


/* ==========================
   UPLOAD ROOT
========================== */

const UPLOAD_ROOT =
  process.env.UPLOAD_ROOT ||
  "/home/u161150306/domains/api.parasmanijewelers.in/uploads";


/* ==========================
   STATIC UPLOADS
========================== */

app.use(
  "/uploads",
  express.static(UPLOAD_ROOT)
);


/* ==========================
   API ROUTES
========================== */

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/design-requests",
  designRequestRoutes
);


/* ==========================
   TEST ROUTE
========================== */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Parasmani Backend Running 🚀",
  });
});


module.exports = app;