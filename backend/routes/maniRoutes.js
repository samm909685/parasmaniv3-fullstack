const router = require("express").Router();
const { getManiCatalog } = require("../controllers/maniController");
// Public read-only catalogue. Existing authenticated category/product routes manage its content.
router.get("/", getManiCatalog);
module.exports = router;
