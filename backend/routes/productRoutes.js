const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

/* Get All Products */

router.get("/", getAllProducts);

/* Create Product */

router.post(
  "/",
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

/* Update Product */

router.put(
  "/:id",
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

/* Delete Product */

router.delete("/:id", deleteProduct);

module.exports = router;