const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Permanent upload location
const UPLOAD_ROOT =
  process.env.UPLOAD_ROOT ||
  "/home/u161150306/domains/api.parasmanijewelers.in/uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;

    // Categories
    if (req.baseUrl.includes("categories")) {
      uploadPath = path.join(UPLOAD_ROOT, "categories");
    }

    // Products
    else if (req.baseUrl.includes("products")) {
      uploadPath = path.join(UPLOAD_ROOT, "products");
    }

    // Default
    else {
      uploadPath = UPLOAD_ROOT;
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    console.log("📁 Upload path:", uploadPath);

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1000000000) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;