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
          console.log(
            "Gallery JSON Error:",
            item.gallery_images
          );

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


/* ==========================
   CREATE PRODUCT
========================== */

exports.createProduct = async (req, res) => {
  try {

    /* ==========================
       FEATURED IMAGE
    ========================== */

    let featuredImage = null;

    if (req.files?.featured_image?.[0]) {
      const file = req.files.featured_image[0];

      const convertedPath =
        await convertHeicToJpg(file.path);

      featuredImage =
        path.basename(convertedPath);
    }


    /* ==========================
       GALLERY IMAGES
    ========================== */

    let galleryImages = [];

    if (req.files?.gallery_images?.length) {
      for (const file of req.files.gallery_images) {

        const convertedPath =
          await convertHeicToJpg(file.path);

        galleryImages.push(
          path.basename(convertedPath)
        );
      }
    }


    /* ==========================
       PRODUCT DATA
    ========================== */

    const product = {

      category_id:
        req.body.category_id,

      name:
        req.body.name,

      product_code:
        req.body.product_code?.trim() || null,

      slug:
        req.body.slug?.trim() || null,

      description:
        req.body.description,

      featured_image:
        featuredImage,

      gallery_images:
        JSON.stringify(galleryImages),

      weight:
        req.body.weight,

      purity:
        req.body.purity,

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

    Product.create(
      product,
      (err, result) => {

        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        res.json({
          success: true,
          message:
            "Product Created Successfully",
        });

      }
    );

  } catch (err) {

    console.error(
      "❌ Create Product Error:",
      err
    );

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
       GET EXISTING PRODUCT
    ========================== */

    const existingProduct =
      await new Promise(
        (resolve, reject) => {

          Product.getById(
            id,
            (err, results) => {

              if (err) {
                reject(err);
                return;
              }

              if (
                !results ||
                !results.length
              ) {
                resolve(null);
                return;
              }

              resolve(results[0]);

            }
          );

        }
      );


    /* ==========================
       PRODUCT NOT FOUND
    ========================== */

    if (!existingProduct) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }


    /* ==========================
       FEATURED IMAGE
    ========================== */

    /*
      IMPORTANT:

      Start with the existing image.

      If the admin does NOT select
      a new image, the old image
      remains in the database.
    */

    let featuredImage =
      existingProduct.featured_image || null;


    /*
      If a new image is uploaded,
      replace the old image.
    */

    if (
      req.files?.featured_image?.[0]
    ) {

      const file =
        req.files.featured_image[0];

      const convertedPath =
        await convertHeicToJpg(
          file.path
        );

      featuredImage =
        path.basename(convertedPath);

    }


    /* ==========================
       GALLERY IMAGES
    ========================== */

    /*
      Start with the existing gallery.

      If no new gallery images are
      uploaded, keep the existing gallery.
    */

    let galleryImages =
      existingProduct.gallery_images ||
      "[]";


    /*
      If new gallery images are
      uploaded, replace the gallery.
    */

    if (
      req.files?.gallery_images?.length
    ) {

      const convertedGallery = [];

      for (
        const file of
        req.files.gallery_images
      ) {

        const convertedPath =
          await convertHeicToJpg(
            file.path
          );

        convertedGallery.push(
          path.basename(convertedPath)
        );

      }

      galleryImages =
        JSON.stringify(
          convertedGallery
        );

    }


    /* ==========================
       PRODUCT DATA
    ========================== */

    const product = {

      category_id:
        req.body.category_id,

      name:
        req.body.name,

      product_code:
        req.body.product_code?.trim() ||
        null,

      slug:
        req.body.slug?.trim() ||
        null,

      description:
        req.body.description,

      featured_image:
        featuredImage,

      gallery_images:
        galleryImages,

      weight:
        req.body.weight,

      purity:
        req.body.purity,

      featured:
        req.body.featured === "true" ||
        req.body.featured === true,

      status:
        req.body.status === "true" ||
        req.body.status === true,

      display_order:
        req.body.display_order ||
        existingProduct.display_order ||
        0,
    };


    /* ==========================
       UPDATE DATABASE
    ========================== */

    Product.update(
      id,
      product,
      (err) => {

        if (err) {

          return res.status(500).json({
            success: false,
            message: err.message,
          });

        }

        res.json({
          success: true,
          message:
            "Product Updated Successfully",
        });

      }
    );

  } catch (err) {

    console.error(
      "❌ Update Product Error:",
      err
    );

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

  Product.delete(
    req.params.id,
    (err) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      res.json({
        success: true,
        message:
          "Product Deleted Successfully",
      });

    }
  );

};