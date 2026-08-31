const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");


/* ==========================
   GET ALL PRODUCTS
   PUBLIC
========================== */

router.get(
  "/",
  getAllProducts
);


/* ==========================
   CREATE PRODUCT
   PROTECTED
========================== */

router.post(
  "/",
  authMiddleware,
  upload.fields([
    {
      name: "featured_image",
      maxCount: 1,
    },
    {
      name: "gallery_images",
      maxCount: 20,
    },
  ]),
  createProduct
);


/* ==========================
   UPDATE PRODUCT
   PROTECTED
========================== */

router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    {
      name: "featured_image",
      maxCount: 1,
    },
    {
      name: "gallery_images",
      maxCount: 20,
    },
  ]),
  updateProduct
);


/* ==========================
   DELETE PRODUCT
   PROTECTED
========================== */

router.delete(
  "/:id",
  authMiddleware,
  deleteProduct
);


module.exports = router;