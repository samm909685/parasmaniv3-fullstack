/**
 * Run from backend: node scripts/convert-mani-types.js --uploads=/absolute/uploads
 * Dry-run by default. --apply writes; no deletion or schema changes.
 */
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
function planConversion(types, products, categoryId) {
  return types.filter(t => String(t.category_id) === String(categoryId)).map(t => {
    const slug = "mani-import-" + t.id;
    const done = products.find(p => p.slug === slug && String(p.mani_type_id) === String(t.id));
    if (done) return {type:t, action:"already-converted", productId:done.id};
    const linked = products.filter(p => String(p.mani_type_id) === String(t.id));
    if (linked.length) return {type:t, action:"review-existing-products", productIds:linked.map(p=>p.id)};
    const same = products.filter(p => String(p.name).trim().toLowerCase() === String(t.name).trim().toLowerCase() || p.slug === t.slug || p.slug === slug);
    if (same.length) return {type:t, action:"review-name-conflict", productIds:same.map(p=>p.id)};
    return {type:t, action:"create", slug};
  });
}
function safeImage(name) {
  return typeof name === "string" && name.length > 0 && !/[\\/]/.test(name) && name !== "." && name !== "..";
}
async function preparePhoto(type, uploadRoot, apply) {
  if (!type.image) return null;
  if (!safeImage(type.image)) throw new Error("Unsafe image filename for type " + type.id);
  const source = path.join(uploadRoot,"mani-types",type.image);
  const bytes = await fs.readFile(source); // Missing image aborts, never silently loses it.
  const name = "mani-import-" + type.id + "-" + crypto.createHash("sha256").update(bytes).digest("hex").slice(0,16) + path.extname(type.image).toLowerCase();
  const destination = path.join(uploadRoot,"products",name);
  if (apply) {
    await fs.mkdir(path.dirname(destination),{recursive:true});
    try { await fs.writeFile(destination,bytes,{flag:"wx"}); }
    catch (error) {
      if (error.code !== "EEXIST") throw error;
      const existing = await fs.readFile(destination);
      if (!existing.equals(bytes)) throw new Error("Image collision: " + destination);
    }
  }
  return name;
}
async function main() {
  require("dotenv").config({path:path.join(__dirname,"../.env")});
  const args = process.argv.slice(2);
  if (args.some(a=>a!=="--apply" && !a.startsWith("--uploads="))) throw new Error("Use only --apply and --uploads=/absolute/uploads");
  const apply = args.includes("--apply");
  const uploadRoot = args.find(a=>a.startsWith("--uploads="))?.slice(10) || process.env.UPLOAD_ROOT;
  if (!uploadRoot || !path.isAbsolute(uploadRoot)) throw new Error("Set UPLOAD_ROOT or pass --uploads with your actual absolute uploads path.");
  const mysql = require("mysql2/promise");
  const db = await mysql.createConnection({
    host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,database:process.env.DB_NAME
  });
  let locked=false;
  try {
    const [lock] = await db.query("SELECT GET_LOCK('parasmani_flat_mani_conversion', 0) AS acquired");
    if (Number(lock[0].acquired)!==1) throw new Error("Another conversion is running.");
    locked=true;
    const [engines] = await db.query("SELECT TABLE_NAME,ENGINE FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME IN ('products','mani_types','categories')");
    if (engines.length!==3 || engines.some(t=>t.ENGINE!=="InnoDB")) throw new Error("Expected products, mani_types and categories to use InnoDB. Stop and review the schema.");
    await db.beginTransaction();
    const [categories] = await db.query("SELECT * FROM categories WHERE slug='mani' FOR UPDATE");
    if (categories.length!==1) throw new Error("Expected exactly one category with slug mani. No categories were changed.");
    const category=categories[0];
    const [types] = await db.query("SELECT * FROM mani_types WHERE category_id=? ORDER BY id FOR UPDATE",[category.id]);
    const [products] = await db.query("SELECT * FROM products FOR UPDATE");
    const plan=planConversion(types,products,category.id);
    console.table(plan.map(p=>({type_id:p.type.id,name:p.type.name,action:p.action,product_ids:p.productId||p.productIds?.join(",")||""})));
    if (plan.some(p=>p.action.startsWith("review-"))) throw new Error("Existing products/conflicts need review. Nothing was inserted. Use Admin > Products to inspect them; do not delete records.");
    const inserts=[];
    for (const item of plan.filter(p=>p.action==="create")) {
      const t=item.type;
      const image=await preparePhoto(t,uploadRoot,apply);
      inserts.push({item,image});
    }
    if (!apply) {
      await db.rollback();
      console.log("DRY RUN ONLY. Would create " + inserts.length + " products. No files or database rows changed.");
      return;
    }
    const created=[];
    for (const {item,image} of inserts) {
      const t=item.type;
      const [result]=await db.query(
        "INSERT INTO products (category_id,mani_type_id,name,product_code,slug,description,featured_image,gallery_images,weight,purity,featured,status,display_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [category.id,t.id,t.name,null,item.slug,t.description||"",image,"[]","","",0,t.status,t.display_order||0]
      );
      created.push({type_id:t.id,product_id:result.insertId,name:t.name});
    }
    await db.commit();
    console.table(created);
    console.log("Created "+created.length+" products. Original types/photos and existing products retained. Re-running skips converted entries.");
    if (![true,1,"1","true"].includes(category.status)) console.log("Mani category is inactive: activate it in Admin > Categories when ready.");
  } catch(error) {
    await db.rollback().catch(()=>{});
    throw error;
  } finally {
    if (locked) await db.query("SELECT RELEASE_LOCK('parasmani_flat_mani_conversion')").catch(()=>{});
    await db.end();
  }
}
if (require.main===module) main().catch(error=>{console.error("Conversion stopped:",error.message);process.exitCode=1;});
module.exports={planConversion,safeImage,preparePhoto};
