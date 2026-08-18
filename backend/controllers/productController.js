const Product = require("../models/productModel");
const path = require("path");
const convertHeicToJpg = require("../utils/convertHeic");


/* ==========================
   GET ALL PRODUCTS
========================== */

exports.getAllProducts = (req, res) => {
  const API_URL = `${req.protocol}://${req.get("host")}`;

  Product.getAll((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    const products = results.map((item) => ({
      ...item,

     featured_image: item.featured_image
  ? `${API_URL}/uploads/products/${item.featured_image}`
  : null,

     gallery_images: (() => {
  try {
    return item.gallery_images
      ? JSON.parse(item.gallery_images).map(
          (img) =>
            `${API_URL}/uploads/products/${img}`
        )
      : [];
  } catch (err) {
    console.log("Gallery JSON Error:", item.gallery_images);
    return [];
  }
})(),
    }));

    res.json({
      success: true,
      data: products,
    });
  });
};

exports.createProduct = async (req, res) => {
  try {
    /* ==========================
       FEATURED IMAGE
    ========================== */

    let featuredImage = null;

    if (req.files?.featured_image?.[0]) {
      const file = req.files.featured_image[0];

      const convertedPath = await convertHeicToJpg(file.path);

      featuredImage = path.basename(convertedPath);
    }

    /* ==========================
       GALLERY IMAGES
    ========================== */

    let galleryImages = [];

    if (req.files?.gallery_images?.length) {
      for (const file of req.files.gallery_images) {
        const convertedPath = await convertHeicToJpg(file.path);

        galleryImages.push(path.basename(convertedPath));
      }
    }

    /* ==========================
       PRODUCT DATA
    ========================== */

    const product = {
      category_id: req.body.category_id,

      name: req.body.name,

      product_code: req.body.product_code?.trim() || null,

      slug: req.body.slug?.trim() || null,

      description: req.body.description,

      featured_image: featuredImage,

      gallery_images: JSON.stringify(galleryImages),

      weight: req.body.weight,

      purity: req.body.purity,

      featured:
        req.body.featured === "true" ||
        req.body.featured === true,

      status:
        req.body.status === "true" ||
        req.body.status === true,

      display_order:
        req.body.display_order || 0,
    };

    /* ==========================
       SAVE TO DATABASE
    ========================== */

    Product.create(product, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        message: "Product Created Successfully",
      });
    });

  } catch (err) {
    console.error("❌ Create Product Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ==========================
   UPDATE PRODUCT
========================== */

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    /* ==========================
       FEATURED IMAGE
    ========================== */

    let featuredImage =
      req.body.featured_image || null;

    if (req.files?.featured_image?.[0]) {
      const file = req.files.featured_image[0];

      const convertedPath = await convertHeicToJpg(file.path);

      featuredImage = path.basename(convertedPath);
    }

    /* ==========================
       GALLERY IMAGES
    ========================== */

    let galleryImages = req.body.gallery_images || "[]";

    if (req.files?.gallery_images?.length) {
      const convertedGallery = [];

      for (const file of req.files.gallery_images) {
        const convertedPath = await convertHeicToJpg(file.path);

        convertedGallery.push(path.basename(convertedPath));
      }

      galleryImages = JSON.stringify(convertedGallery);
    }

    /* ==========================
       PRODUCT DATA
    ========================== */

    const product = {
      category_id: req.body.category_id,

      name: req.body.name,

      product_code: req.body.product_code,

      slug: req.body.slug,

      description: req.body.description,

      featured_image: featuredImage,

      gallery_images: galleryImages,

      weight: req.body.weight,

      purity: req.body.purity,

      featured:
        req.body.featured === "true" ||
        req.body.featured === true,

      status:
        req.body.status === "true" ||
        req.body.status === true,

      display_order:
        req.body.display_order || 0,
    };

    /* ==========================
       UPDATE DATABASE
    ========================== */

    Product.update(id, product, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        message: "Product Updated Successfully",
      });
    });

  } catch (err) {
    console.error("❌ Update Product Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ==========================
   DELETE PRODUCT
========================== */

exports.deleteProduct = (req, res) => {

  Product.delete(req.params.id, (err) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      message: "Product Deleted Successfully",
    });

  });

};