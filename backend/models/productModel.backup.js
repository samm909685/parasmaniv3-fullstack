
const db = require("../config/db");

const Product = {
  // Get all products
  getAll(callback) {
    const sql = `
      SELECT
        products.*,
        categories.name AS category_name
      FROM products
      INNER JOIN categories
      ON products.category_id = categories.id
      ORDER BY products.display_order ASC, products.id DESC
    `;

    db.query(sql, callback);
  },

  // Create product
  create(product, callback) {
    const sql = `
      INSERT INTO products
      (
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
        product.display_order,
      ],
      callback
    );
  },

  // Update product
  update(id, product, callback) {
    const sql = `
      UPDATE products
      SET
        category_id=?,
        name=?,
        product_code=?,
        slug=?,
        description=?,
        featured_image=?,
        gallery_images=?,
        weight=?,
        purity=?,
        featured=?,
        status=?,
        display_order=?
      WHERE id=?
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
        product.display_order,
        id,
      ],
      callback
    );
  },

  // Delete product
  delete(id, callback) {
    db.query(
      "DELETE FROM products WHERE id=?",
      [id],
      callback
    );
  },

  // Get one product
  getById(id, callback) {
    db.query(
      "SELECT * FROM products WHERE id=?",
      [id],
      callback
    );
  },
};

module.exports = Product;