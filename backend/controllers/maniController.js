const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const { buildCatalog } = require("../utils/maniCatalog");
const load = model => new Promise((resolve, reject) => model.getAll((error, rows) => error ? reject(error) : resolve(rows)));
exports.getManiCatalog = async (req, res) => {
  try {
    const [categories, products] = await Promise.all([load(Category), load(Product)]);
    const origin = process.env.PUBLIC_API_URL || `${req.protocol}://${req.get("host")}`;
    res.json({ success: true, data: buildCatalog(categories, products, origin) });
  } catch (error) {
    console.error("Mani catalog could not be loaded:", error.message);
    res.status(500).json({ success: false, message: "Unable to load our Mani collection. Please try again." });
  }
};
