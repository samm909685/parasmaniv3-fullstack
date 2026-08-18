const db = require("../config/db");

const Category = {
  getAll(callback) {
    const sql = `
      SELECT *
      FROM categories
      ORDER BY display_order ASC, id DESC
    `;

    db.query(sql, callback);
  },

  getById(id, callback) {
    db.query(
      "SELECT * FROM categories WHERE id = ?",
      [id],
      callback
    );
  },

  create(category, callback) {
    const sql = `
      INSERT INTO categories
      (name, slug, image, description, featured, status, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        category.name,
        category.slug,
        category.image,
        category.description,
        category.featured,
        category.status,
        category.display_order,
      ],
      callback
    );
  },

  update(id, category, callback) {
    const sql = `
      UPDATE categories
      SET
      name=?,
      slug=?,
      image=?,
      description=?,
      featured=?,
      status=?,
      display_order=?
      WHERE id=?
    `;

    db.query(
      sql,
      [
        category.name,
        category.slug,
        category.image,
        category.description,
        category.featured,
        category.status,
        category.display_order,
        id,
      ],
      callback
    );
  },

  delete(id, callback) {
    db.query(
      "DELETE FROM categories WHERE id=?",
      [id],
      callback
    );
  },
};

module.exports = Category;