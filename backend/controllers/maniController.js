const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const ManiType = require("../models/maniTypeModel");
const { buildCatalog, buildProducts } = require("../utils/maniCatalog");
const load=model=>new Promise((resolve,reject)=>model.getAll((err,rows)=>err?reject(err):resolve(rows)));
exports.getManiCatalog=async(req,res)=>{
  try {
    const [categories,products,types]=await Promise.all([load(Category),load(Product),load(ManiType)]);
    const origin=process.env.PUBLIC_API_URL||`${req.protocol}://${req.get("host")}`;
    return res.json({success:true,data:buildCatalog(categories,products,types,origin),products:buildProducts(categories,products,origin)});
  }catch(error){console.error("Mani catalog:",error.message);return res.status(500).json({success:false,message:"Unable to load our Mani collection. Please try again."});}
};
