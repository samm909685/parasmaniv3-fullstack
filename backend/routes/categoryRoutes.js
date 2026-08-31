const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");


/* ==========================
   GET ALL CATEGORIES
   PUBLIC
========================== */

router.get(
  "/",
  getAllCategories
);


/* ==========================
   CREATE CATEGORY
   PROTECTED
========================== */

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createCategory
);


/* ==========================
   UPDATE CATEGORY
   PROTECTED
========================== */

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateCategory
);


/* ==========================
   DELETE CATEGORY
   PROTECTED
========================== */

router.delete(
  "/:id",
  authMiddleware,
  deleteCategory
);


module.exports = router;