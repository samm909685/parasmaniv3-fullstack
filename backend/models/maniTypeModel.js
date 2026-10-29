const db = require("../config/db");
module.exports = {
  getAll(cb) { db.query(`SELECT t.*, c.name AS category_name, c.slug AS category_slug,
    (SELECT COUNT(*) FROM products p WHERE p.mani_type_id=t.id) AS product_count
    FROM mani_types t JOIN categories c ON c.id=t.category_id ORDER BY t.display_order,t.id`,cb); },
  getById(id, cb) { db.query("SELECT * FROM mani_types WHERE id=?",[id],cb); },
  create(data, cb) { db.query("INSERT INTO mani_types (category_id,name,slug,description,image,status,display_order) VALUES (?,?,?,?,?,?,?)",[data.category_id,data.name,data.slug,data.description,data.image,data.status,data.display_order],cb); },
  update(id,data,cb) { db.query("UPDATE mani_types SET name=?,slug=?,description=?,image=?,status=?,display_order=? WHERE id=?",[data.name,data.slug,data.description,data.image,data.status,data.display_order,id],cb); }
};
