const db = require("../config/db");

const Product = {

  // ==========================
  // GET ALL PRODUCTS
  // ==========================

  getAll(callback) {

    const sql = `
      SELECT
        products.*,
        categories.name AS category_name
      FROM products
      INNER JOIN categories
        ON products.category_id = categories.id
      ORDER BY
        products.display_order ASC,
        products.id DESC
    `;

    db.query(sql, callback);
  },


  // ==========================
  // CREATE PRODUCT
  // ==========================

  create(product, callback) {

    const sql = `
      INSERT INTO products (
        category_id,
        name,
        product_code,
        slug,
        description,
        featured_image,
        gallery_images,
        weight,
        purity,
        featured,
        status,
        display_order
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        product.category_id,
        product.name,
        product.product_code,
        product.slug,
        product.description,
        product.featured_image,
        product.gallery_images,
        product.weight,
        product.purity,
        product.featured,
        product.status,
        product.display_order
      ],
      callback
    );
  },


  // ==========================
  // UPDATE PRODUCT
  // ==========================

  update(id, product, callback) {

    const sql = `
      UPDATE products
      SET
        category_id = ?,
        name = ?,
        product_code = ?,
        slug = ?,
        description = ?,
        featured_image = ?,
        gallery_images = ?,
        weight = ?,
        purity = ?,
        featured = ?,
        status = ?,
        display_order = ?
      WHERE id = ?
    `;


    // DEBUG LOGS
    console.log("=================================");
    console.log("🔥 UPDATE PRODUCT MODEL CALLED");
    console.log("🔥 PRODUCT ID:", id);
    console.log("🔥 PRODUCT DATA:", product);
    console.log("🔥 SQL:", sql);
    console.log("=================================");


    const values = [
      product.category_id,
      product.name,
      product.product_code,
      product.slug,
      product.description,
      product.featured_image,
      product.gallery_images,
      product.weight,
      product.purity,
      product.featured,
      product.status,
      product.display_order,
      id
    ];


    console.log("🔥 SQL VALUES:", values);


    db.query(
      sql,
      values,
      (err, result) => {

        if (err) {

          console.error("❌ MYSQL UPDATE ERROR:", err);

          return callback(err);

        }

        console.log("✅ PRODUCT UPDATE SUCCESS");

        callback(null, result);
      }
    );
  },


  // ==========================
  // DELETE PRODUCT
  // ==========================

  delete(id, callback) {

    const sql = `
      DELETE FROM products
      WHERE id = ?
    `;

    db.query(
      sql,
      [id],
      callback
    );
  },


  // ==========================
  // GET PRODUCT BY ID
  // ==========================

  getById(id, callback) {

    const sql = `
      SELECT *
      FROM products
      WHERE id = ?
    `;

    db.query(
      sql,
      [id],
      callback
    );
  }

};


module.exports = Product;