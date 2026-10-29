const db=require("../config/db");
const columns=["category_id","mani_type_id","name","product_code","slug","description","featured_image","gallery_images","weight","purity","featured","status","display_order"];
const Product={
 getAll(callback){db.query(`SELECT products.*,categories.name AS category_name,
  mani_types.name AS mani_type_name,mani_types.slug AS mani_type_slug
  FROM products INNER JOIN categories ON products.category_id=categories.id
  LEFT JOIN mani_types ON products.mani_type_id=mani_types.id AND mani_types.category_id=products.category_id
  ORDER BY products.display_order ASC,products.id DESC`,callback);},
 getById(id,callback){db.query("SELECT * FROM products WHERE id=?",[id],callback);},
 create(product,callback){db.query(`INSERT INTO products (${columns.join(",")}) VALUES (${columns.map(()=>"?").join(",")})`,columns.map(key=>product[key]??null),callback);},
 update(id,product,callback){db.query(`UPDATE products SET ${columns.map(key=>key+"=?").join(",")} WHERE id=?`,[...columns.map(key=>product[key]??null),id],callback);},
 delete(id,callback){db.query("DELETE FROM products WHERE id=?",[id],callback);}
};
module.exports=Product;
