const Category = require("../models/categoryModel");

/* ===========================
   GET ALL CATEGORIES
=========================== */

const getAllCategories = (req, res) => {
  Category.getAll((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch categories",
      });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};

/* ===========================
   CREATE CATEGORY
=========================== */

const createCategory = (req, res) => {
  const {
    name,
    slug,
    description,
    featured,
    status,
    display_order,
  } = req.body;

  if (!name || !slug) {
    return res.status(400).json({
      success: false,
      message: "Name and Slug are required.",
    });
  }

  const category = {
    name,
    slug,
    image: req.file ? req.file.filename : null,
    description: description || "",
    featured: featured === "true" || featured === true,
    status: status === "true" || status === true,
    display_order: display_order || 0,
  };

  Category.create(category, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to create category",
      });
    }

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      id: result.insertId,
    });
  });
};

/* ===========================
   UPDATE CATEGORY
=========================== */

const updateCategory = (req, res) => {
  const id = req.params.id;

  Category.getById(id, (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const oldCategory = rows[0];

    const category = {
      name: req.body.name,
      slug: req.body.slug,
      image: req.file ? req.file.filename : oldCategory.image,
      description: req.body.description,
      featured:
        req.body.featured === "true" || req.body.featured === true,
      status:
        req.body.status === "true" || req.body.status === true,
      display_order: req.body.display_order || 0,
    };

    Category.update(id, category, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to update category",
        });
      }

      res.json({
        success: true,
        message: "Category updated successfully",
      });
    });
  });
};

/* ===========================
   DELETE CATEGORY
=========================== */

const deleteCategory = (req, res) => {
  const id = req.params.id;

  Category.delete(id, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete category",
      });
    }

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  });
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};