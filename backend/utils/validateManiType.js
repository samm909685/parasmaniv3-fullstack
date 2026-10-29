const Category=require("../models/categoryModel");
const ManiType=require("../models/maniTypeModel");
const {active}=require("./maniCatalog");
const row=(model,id)=>new Promise((resolve,reject)=>model.getById(id,(err,rows)=>err?reject(err):resolve(rows?.[0]||null)));
class ManiValidationError extends Error { constructor(message){super(message);this.statusCode=400;} }
async function validateProductType(categoryId,requestedType,existing=null){
  const category=await row(Category,categoryId);
  if(!category) throw new ManiValidationError("Please select a valid category.");
  if(category.slug!=="mani") {
    if(requestedType!==undefined && requestedType!==null && requestedType!=="") throw new ManiValidationError("Mani types belong to the Mani category only.");
    return null;
  }
  const value=requestedType===undefined ? (String(existing?.category_id)===String(categoryId)?existing?.mani_type_id:null) : requestedType;
  // Keep legacy products unassigned until an admin chooses their correct type.
  if(value===undefined||value===null||value==="") return null;
  if(!/^\d+$/.test(String(value)) || Number(value)<1) throw new ManiValidationError("Please select a valid Mani type.");
  const type=await row(ManiType,value);
  if(!type || String(type.category_id)!==String(categoryId)) throw new ManiValidationError("This type does not belong to the selected category.");
  const unchanged=existing && String(existing.mani_type_id)===String(type.id) && String(existing.category_id)===String(categoryId);
  if(!active(type.status) && !unchanged) throw new ManiValidationError("This Mani type is inactive. Choose an active type.");
  return type.id;
}
module.exports={validateProductType};
