const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

/* Get All */

router.get("/", getAllCategories);

/* Create */

router.post(
  "/",
  upload.single("image"),
  createCategory
);

/* Update */

router.put(
  "/:id",
  upload.single("image"),
  updateCategory
);

/* Delete */

router.delete("/:id", deleteCategory);

module.exports = router;