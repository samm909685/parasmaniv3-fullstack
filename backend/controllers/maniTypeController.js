const ManiType=require("../models/maniTypeModel");
const Category=require("../models/categoryModel");
const {active,imageUrl}=require("../utils/maniCatalog");
const fs=require("fs/promises");
const load=(model)=>new Promise((resolve,reject)=>model.getAll((err,rows)=>err?reject(err):resolve(rows)));
const get=id=>new Promise((resolve,reject)=>ManiType.getById(id,(err,rows)=>err?reject(err):resolve(rows?.[0]||null)));
const origin=req=>process.env.PUBLIC_API_URL||`${req.protocol}://${req.get("host")}`;
exports.list=async(req,res)=>{
 try{const rows=await load(ManiType);res.json({success:true,data:rows.filter(t=>t.category_slug==="mani").map(t=>({...t,image_url:imageUrl(t.image,"mani-types",origin(req))}))});}
 catch(error){console.error(error.message);res.status(500).json({success:false,message:"Unable to load Mani types. Run the database migration first."});}
};
function parse(body){
 const name=String(body.name||"").trim(),slug=String(body.slug||"").trim().toLowerCase();
 const order=Number(body.display_order||0), description=String(body.description||"").trim();
 if(!name||name.length>120) throw Object.assign(new Error("Enter a name of up to 120 characters."),{statusCode:400});
 if(slug.length>140||! /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw Object.assign(new Error("Use lowercase letters, numbers and hyphens for the slug."),{statusCode:400});
 if(!Number.isSafeInteger(order)||order<0||order>1000000) throw Object.assign(new Error("Display order must be a whole number from 0 to 1000000."),{statusCode:400});
 if(description.length>10000) throw Object.assign(new Error("Please shorten the description."),{statusCode:400});
 return {name,slug,description,display_order:order,status:active(body.status)};
}
async function save(req,res,editing){
 try{
  const data=parse(req.body);
  const categories=await load(Category),category=categories.find(c=>c.slug==="mani");
  if(!category) throw Object.assign(new Error("Create the Mani category with slug mani first."),{statusCode:400});
  const existing=editing?await get(req.params.id):null;
  if(editing&&(!existing||String(existing.category_id)!==String(category.id))) throw Object.assign(new Error("Mani type not found."),{statusCode:404});
  data.category_id=category.id;
  data.image=req.file?.filename||existing?.image||null;
  await new Promise((resolve,reject)=>{
   const done=(err,result)=>err?reject(err):resolve(result);
   if(editing) ManiType.update(req.params.id,data,done);else ManiType.create(data,done);
  });
  res.status(editing?200:201).json({success:true,message:editing?"Mani type updated.":"Mani type created."});
 }catch(error){
  if(req.file) await fs.unlink(req.file.path).catch(()=>{});
  const duplicate=error.code==="ER_DUP_ENTRY";
  res.status(duplicate?409:error.statusCode||500).json({success:false,message:duplicate?"A Mani type already uses this slug.":error.statusCode?error.message:"Unable to save Mani type. Please try again."});
 }
}
exports.create=(req,res)=>save(req,res,false);
exports.update=(req,res)=>save(req,res,true);
